import React, { useState, useEffect, useCallback, useMemo } from 'react';
import vk from "../assets/vikvivo.jpg";
import { useNavigate } from 'react-router-dom';

const Scratch = () => {
  const navigate = useNavigate();
  
  // Initial state
  const [formData, setFormData] = useState({
    selectedCampaign: '',
    selectedProduct: '',
    productUID: '',
    customerName: '',
    customerEmail: '',
    customerNumber: '',
    placeOfPurchase: '',
    invoice: null,
  });

  const [errors, setErrors] = useState({
    customerEmail: '',
    customerNumber: '',
    fetchProducts: '',
  });

  const [campaignOptions, setCampaignOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [type, setType] = useState(false);

  // Fetch campaigns on mount only
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:3000/campaign');
        const result = await response.json();

        if (response.ok) {
          setCampaignOptions(result.data.map(campaign => campaign.Name));
          setType(result.data[0].FortuneWheel);
        } else {
          console.error('Error fetching campaigns:', result.message);
          setErrors(prevErrors => ({
            ...prevErrors,
            fetchProducts: 'Error fetching campaigns.',
          }));
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setErrors(prevErrors => ({
          ...prevErrors,
          fetchProducts: 'An error occurred while fetching campaigns.',
        }));
      }
    };

    fetchCampaigns();
  }, []);

  // Fetch products only when selectedCampaign changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/uniqueProducts/${formData.selectedCampaign}`);
        const result = await response.json();

        if (response.ok) {
          setProductOptions(result.uniqueProducts || []);
          setErrors(prevErrors => ({
            ...prevErrors,
            fetchProducts: '',
          }));
        } else {
          console.error('Error fetching products:', result.message);
          setProductOptions([]);
          setErrors(prevErrors => ({
            ...prevErrors,
            fetchProducts: 'Error fetching products.',
          }));
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setProductOptions([]);
        setErrors(prevErrors => ({
          ...prevErrors,
          fetchProducts: 'An error occurred while fetching products.',
        }));
      }
    };

    if (formData.selectedCampaign) {
      fetchProducts();
    } else {
      setProductOptions([]);
    }
  }, [formData.selectedCampaign]);

  // Form field validation with useCallback
  const validateEmail = useCallback((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), []);
  const validatePhoneNumber = useCallback((number) => /^\d{10}$/.test(number), []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'invoice' ? files[0] : value,
    }));

    // Inline email and phone number validation
    if (name === 'customerEmail') {
      setErrors(prevErrors => ({
        ...prevErrors,
        customerEmail: value ? (validateEmail(value) ? '' : 'Please enter a valid email address.') : 'Email is required.',
      }));
    }

    if (name === 'customerNumber') {
      setErrors(prevErrors => ({
        ...prevErrors,
        customerNumber: value ? (validatePhoneNumber(value) ? '' : 'Phone number must be exactly 10 digits.') : 'Phone number is required.',
      }));
    }
  };

  // Memoize required fields for validation to avoid re-calculation
  const requiredFields = useMemo(() => ['selectedCampaign', 'selectedProduct', 'productUID', 'customerName', 'customerEmail', 'customerNumber', 'placeOfPurchase', 'invoice'], []);

  // Submit form data
  const handleSubmit = async () => {
    setSubmissionMessage('');
    
    if (Object.values(errors).some(err => err)) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }
    
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').toUpperCase()} field.`);
        return;
      }
    }
  
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/ncitem/${formData.selectedCampaign}/${formData.productUID}`);
      const result = await response.json();

      if (response.ok) {
        const selectedCitem = result.data.find(product => product.Selectedproduct === formData.selectedProduct);
        if (selectedCitem) {
          if (selectedCitem.Status) {
            alert('The prize has already been claimed.');
            return;
          }

          const formDataToSend = new FormData();
          formDataToSend.append('WinnerImei', formData.productUID);
          formDataToSend.append('WinnerName', formData.customerName);
          formDataToSend.append('Prize', type ? selectedCitem.Wheelprize : selectedCitem.Scratchprize);
          formDataToSend.append('Claimedon', new Date().toLocaleDateString());
          formDataToSend.append('location', formData.placeOfPurchase);
          if (formData.invoice) formDataToSend.append('invoice', formData.invoice);

          await fetch(`http://localhost:3000/nc/${selectedCitem.Campaign_Name}`, {
            method: 'POST',
            body: formDataToSend,
          });

          await fetch(`http://localhost:3000/ncitems/${selectedCitem.Campaign_Name}/${selectedCitem.WinnerImei}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Status: true, Claimedon: new Date(), WinnerName: formData.customerName }),
          });

          navigate('/celebration', {
            state: {
              wprize: selectedCitem.Wheelprize,
              sprize: selectedCitem.Scratchprize,
              cgname: selectedCitem.Campaign_Name,
              imei: selectedCitem.WinnerImei,
            },
          });

          setSubmissionMessage('Form submitted successfully!');
          alert('Form submitted successfully!');
          handleReset();
        } else {
          alert('Selected product not found.');
        }
      } else {
        console.error('Error fetching products:', result.message);
        alert('Error fetching products. Please try again later.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred during submission. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      selectedCampaign: '',
      selectedProduct: '',
      productUID: '',
      customerName: '',
      customerEmail: '',
      customerNumber: '',
      placeOfPurchase: '',
      invoice: null,
    });
    setErrors({
      customerEmail: '',
      customerNumber: '',
      fetchProducts: '',
    });
    setSubmissionMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-radial-gradient p-4">
      <div className='img mb-6 w-full max-w-2xl'>
        <img src={vk} alt="Vivo" className='object-cover mx-auto rounded-lg w-full' />
      </div>

      <div className='form-container bg-white p-8 rounded-lg shadow-md w-full max-w-xl'>
        <h2 className='text-2xl font-bold mb-4'>Vivo Play and Win</h2>
        <p className="text-red-500 mb-4">{errors.fetchProducts}</p>

        <div className='form-group mb-4'>
          <label htmlFor='selectedCampaign' className='block mb-1'>Select Campaign:</label>
          <select 
            id='selectedCampaign' 
            name='selectedCampaign' 
            value={formData.selectedCampaign} 
            onChange={handleChange}
            className='border rounded-md p-2 w-full'
          >
            <option value=''>Select Campaign</option>
            {campaignOptions.map((campaign, index) => (
              <option key={index} value={campaign}>{campaign}</option>
            ))}
          </select>
        </div>

        <div className='form-group mb-4'>
          <label htmlFor='selectedProduct' className='block mb-1'>Select Product:</label>
          <select 
            id='selectedProduct' 
            name='selectedProduct' 
            value={formData.selectedProduct} 
            onChange={handleChange}
            className='border rounded-md p-2 w-full'
          >
            <option value=''>Select Product</option>
            {productOptions.map((product, index) => (
              <option key={index} value={product}>{product}</option>
            ))}
          </select>
        </div>
        
        <div className='form-group mb-4'>
        <label htmlFor='productUID' className='block mb-1'>Product UID:</label>
        <input 
          type='text' 
          id='productUID' 
          name='productUID' 
          value={formData.productUID} 
          onChange={handleChange} 
          className='border rounded-md p-2 w-full'
        />
      </div>

      <div className='form-group mb-4'>
        <label htmlFor='customerName' className='block mb-1'>Customer Name:</label>
        <input 
          type='text' 
          id='customerName' 
          name='customerName' 
          value={formData.customerName} 
          onChange={handleChange} 
          className='border rounded-md p-2 w-full'
        />
      </div>

      <div className='form-group mb-4'>
        <label htmlFor='customerEmail' className='block mb-1'>Customer Email:</label>
        <input 
          type='email' 
          id='customerEmail' 
          name='customerEmail' 
          value={formData.customerEmail} 
          onChange={handleChange} 
          className='border rounded-md p-2 w-full'
        />
        <p className="text-red-500">{errors.customerEmail}</p>
      </div>

      <div className='form-group mb-4'>
        <label htmlFor='customerNumber' className='block mb-1'>Customer Number:</label>
        <input 
          type='text' 
          id='customerNumber' 
          name='customerNumber' 
          value={formData.customerNumber} 
          onChange={handleChange} 
          className='border rounded-md p-2 w-full'
        />
        <p className="text-red-500">{errors.customerNumber}</p>
      </div>

      <div className='form-group mb-4'>
<label htmlFor='placeOfPurchase' className='block mb-1'>Place of Purchase:</label>
<select 
  id='placeOfPurchase' 
  name='placeOfPurchase' 
  value={formData.placeOfPurchase} 
  onChange={handleChange} 
  className='border rounded-md p-2 w-full'
>
  <option value='' disabled>Select Place of Purchase</option>
  <option value='Jammu'>Jammu</option>
  <option value='Leh'>Leh</option>
  <option value='Kashmir'>Kashmir</option>
</select>
</div>


      <div className='form-group mb-4'>
        <label htmlFor='invoice' className='block mb-1'>Upload Invoice:</label>
        <input 
          type='file' 
          id='invoice' 
          name='invoice' 
          onChange={handleChange} 
          className='border rounded-md p-2 w-full'
        />
      </div>

      <div className='flex justify-between'>
      <button 
        onClick={handleSubmit} 
        className='bg-blue-500 text-white rounded-md p-2'
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
      <button 
        onClick={handleReset} 
        className='bg-gray-500 text-white rounded-md p-2'
      >
        Reset
      </button>
    </div>
    

    {submissionMessage&& <p className="text-green-500">{submissionMessage}</p>}
      </div>
    </div>
  );
};

export default Scratch;