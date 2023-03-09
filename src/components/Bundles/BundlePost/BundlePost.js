import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postBundle } from '../../../store/bundle-slice';
import { fetchAsyncCategory, getAllCategories } from '../../../store/category-slice';
import { fetchAsyncCurrency, getAllCurrencies } from '../../../store/currency-slice';
import { fetchAsyncGroupPolicy, getAllPolicies } from '../../../store/policy-slice';
import CategoryDropdown from '../../Category/CategoryDropdown/CategoryDropdown';
import CurrencyDropdown from '../../Currency/CurrencyDropdown/CurrencyDropdown';
import GroupPolicyCard from '../../GroupPolicy/GroupPolicyCard/GroupPolicyCard';

const BundlePost = () => {

  const [empty, setEmpty] = useState('')
  const [categoryState, setCategoryState] = useState('Product Type')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [groupPolicyId, setGroupPolicyId] = useState('')
  const [image, setImage] = useState('')
  const [categoryActioned, setCategoryActioned] = useState('')
  const [bundleCategoryID, setBundleCategoryID] = useState('')
  const [currencyID, setCurrencyID] = useState('')
  const [currencyState, setCurrencyState] = useState('Currency')
  const [groupPolicyState, setGroupPolicyState] = useState('Policy Type')
  const [groupPolicyActioned, setGroupPolicyActioned] = useState('')
  const [currencyActioned, setCurrencyActioned] = useState('')


  const dispatch = useDispatch()
  const active = true

  useEffect(() => {
    dispatch(fetchAsyncCategory(active))
    dispatch(fetchAsyncCurrency(active))
    dispatch(fetchAsyncGroupPolicy())
  }, [dispatch]);

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postBundle({
      bundle: {
        description,
        groupPolicyId,
        id: 1,
        image,
        name,
        price
      },
      bundleCategoryID,
      currencyID,
      userID: 1
    })
    );
    setName('')
    setDescription('')
    setPrice('')
    setCategoryState('Product Type')
    setCurrencyState('Currency')
    setGroupPolicyState('Policy Type')
    setImage('')
  };

  const getPolicy = (id, name) => {
    setGroupPolicyId(id)
    setGroupPolicyActioned(name)
    setGroupPolicyState(name)
  }

  const getCategory = (id, name) => {
    setBundleCategoryID(id)
    setCategoryActioned(name)
    setCategoryState(name)
  }

  const getCurrency = (id, name) => {
    setCurrencyID(id)
    setCurrencyActioned(name)
    setCurrencyState(name)
  }

  const currencyData = useSelector(getAllCurrencies)

  let renderedCurrency = ''
  renderedCurrency = currencyData ? (
    currencyData.map((currency, index) => (
      <tr key={index}>
        <CurrencyDropdown data={currency} setCurrency={getCurrency} />
      </tr>
    ))
  ) : (<div><h1>Error</h1></div>)

  const categoryData = useSelector(getAllCategories)
  let renderedCategory = ''
  renderedCategory = categoryData ? (
    categoryData.map((category, index) => (
      <tr key={index}>
        <CategoryDropdown data={category} setCategory={getCategory} />
      </tr>
    ))
  ) : (<div><h1>Error</h1></div>)

  const groupPolicyData = useSelector(getAllPolicies)
  let renderedGroupPolicy = ''
  renderedGroupPolicy = groupPolicyData ? (
    groupPolicyData.map((policy, index) => (
      <tr key={index}>
        <GroupPolicyCard data={policy} setPolicy={getPolicy} />
      </tr>
    ))
  ) : (<div><h1>Error</h1></div>)

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                <h6 className="text-white text-capitalize ps-3"><i className='fa fa-plus-circle' style={{ fontSize: "15px", paddingRight: "10px" }} />Create Bundles</h6>
              </div>
            </div>
            <div className="p-4">
              <form >
                <div style={{ color: 'red', marginBottom: '10px' }}>{empty}</div>
                <label className="form-label" style={{ padding: 0 }}>Bundle Name</label>
                <div className="input-group input-group-dynamic">
                  <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} className="form-control" style={{ padding: 0 }} />
                </div>
                <label className="form-label" style={{ padding: 0 }}>Price</label>
                <div className="input-group input-group-dynamic">
                  <input type="text" name="price" onChange={(e) => setPrice(e.target.value)} value={price} className="form-control" style={{ padding: 0 }} />
                </div>
                <label className="form-label" style={{ padding: 0 }}>Description</label>
                <div className="input-group input-group-dynamic" style={{ marginBottom: '10px' }}>
                  <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" style={{ padding: 0 }} />
                </div>

                {/* Currency dropdown */}
                <div className="dropdown">
                  <button
                    className="btn bg-gradient-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {currencyState}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {renderedCurrency}
                  </ul>
                </div>

                {/* GroupPolicy dropdown */}
                <div className="dropdown">
                  <button
                    className="btn bg-gradient-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {groupPolicyState}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {renderedGroupPolicy}
                  </ul>
                </div>

                {/* Category dropdown */}
                <div className="dropdown">
                  <button
                    className="btn bg-gradient-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {categoryState}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {renderedCategory}
                  </ul>
                </div>

                <div className="form-group form-file-upload form-file-multiple">
                  <input type="file" name="image" onChange={onImageChange} className="inputFileHidden" />
                  <div className="input-group">
                    <input type="text" className="form-control inputFileVisible" placeholder="Package Image" />
                    <span className="input-group-btn">
                    </span>
                  </div>
                </div>


                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BundlePost;

const Style2 = {
  paddingTop: "1rem",
  paddinBottom: "0.5rem"
}