import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import { ButtonGroup, Form } from "react-bootstrap";
import CategoryCard from '../../Category/CategoryDropdown/CategoryDropdown';
import GroupPolicyCard from '../../GroupPolicy/GroupPolicyCard/GroupPolicyCard';
import CurrencyDropdown from '../../Currency/CurrencyDropdown/CurrencyDropdown';
import { getAllCurrencies } from '../../../store/currency-slice';
import { getAllCategories } from '../../../store/category-slice';
import { getAllPolicies } from '../../../store/policy-slice';
import { getUpdateStatus, updateBundle } from '../../../store/bundle-slice';

const userRole = localStorage.getItem('role')
const bundletype = ''

export default function InboxCard(props) {

  const dispatch = useDispatch()

  const { data, index } = props
  const [bundleName, setBundleName] = useState('')
  const [bundleImage, setBundleImage] = useState('')
  const [bundleDescription, setBundleDescription] = useState('')
  const [bundlePrice, setBundlePrice] = useState('')
  const [id, setId] = useState('')
  const [bundleId, setBundleId] = useState('')
  const [bundleCategory, setBundleCategory] = useState([])
  const [bundleCurrency, setBundleCurrency] = useState('')
  const [categoryActioned, setCategoryActioned] = useState('Category')
  const [gpActioned, setGPActioned] = useState('Group Policy')
  const [currencyActioned, setCurrencyActioned] = useState('Currency')
  const [currencyID, setCurrencyID] = useState('')
  const [categoryID, setCategoryID] = useState('')
  const [gpID, setGPID] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [activeStatus, setActiveStatus] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updateStatus, setUpdateStatus] = useState('')
  const [current, setCurrent] = useState('')

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const openUpdateModal = () => setIsUpdateOpen(true);

  const closeUpdateModal = () => setIsUpdateOpen(false);

  const handleUpdate = () => {
    dispatch(updateBundle(
      {
        active: selectedStatus,
        description: bundleDescription,
        id,
        image: bundleImage,
        name: bundleName,
        price: bundlePrice,
        bundleCategoryId: categoryID,
        currencyId: currencyID,
        groupPolicyId: gpID,
        bundleId
      }
    ))
    console.log(bundleUpdate)
    closeModal()
    closeUpdateModal()
  }
  const changeBundleState = () => {
    dispatch(updateBundle({
      id: id,
      updateAttributes: {
        active: selectedStatus,
        description: bundleDescription,
        id: id,
        image: bundleImage,
        name: bundleName,
        price: bundlePrice,
        bundleCategoryId: categoryID,
        currencyId: currencyID,
        groupPolicyId: gpID
      }
    }
    ))
    console.log(bundleUpdate)
    closeModal()
    closeUpdateModal()
  }

  const bundleUpdate = useSelector(getUpdateStatus)

  const getPolicy = (id, name) => {
    setGPID(id)
    setGPActioned(name)
  }

  const getCategory = (id, name) => {
    setCategoryID(id)
    setCategoryActioned(name)
  }

  const getCurrency = (id, name) => {
    setCurrencyID(id)
    setCurrencyActioned(name)
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
        <CategoryCard data={category} setCategory={getCategory} />
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
  useEffect(() => {
    setBundleId(index)
  }, [])

  return (
    <>
        <td>
            <h6 className="mb-0 text-sm">{data.name}</h6>
        </td>
        <td>
            <h6 className="mb-0 text-sm">{data.name}</h6>
        </td>
        <td>
            <h6 className="mb-0 text-sm">{data.price}</h6>
        </td>
        <td>
            <h6 className="mb-0 text-sm">{data.groupPolicyId}</h6>
        </td>
        <td>
            <h6 className="mb-0 text-sm">{data.bundleCategory.name}</h6>
        </td>
      {
        userRole === 'Admin' || 'Supervisor' ? (
          <td className="align-middle pb-0 pt-0">
            <a className="btn btn-link text-dark px-3 mb-0 mt-0 pt-0 pb-0" onClick={() => {
              let currentStatus = ''
              if (data.active === true) {
                currentStatus = 'Active'
              }
              else {
                currentStatus = 'Deactivated'
              }

              setBundleName(data.name)
              setBundleImage(data.image)
              setBundleDescription(data.description)
              setBundlePrice(data.price)
              setId(data.id)
              setBundleCategory(data.bundleCategory.name)
              setBundleCurrency(data.currency.symbol)
              setActiveStatus(currentStatus)
              setCurrencyID(data.currency.id)
              setCategoryID(data.bundleCategory.id)
              setGPID(data.groupPolicyId)
              setSelectedStatus(data.active)

              openModal() //opens the modal

            }}><i className="material-icons text-sm me-2">edit</i>Edit
            </a>
          </td>
        ) : ("")
      }
      {
        userRole === 'Super Admin' ? (
          <td className="align-middle">
            <a className={data.active ? "btn btn-link text-danger px-3 mb-0" : "btn btn-link text-info px-3 mb-0"} onClick={() => {
              let currentStatus = ''
              if (data.active === true) {
                currentStatus = 'Active'
              }
              else {
                currentStatus = 'Deactivated'
              }
              setBundleName(data.name)
              setBundleImage(data.image)
              setBundleDescription(data.description)
              setBundlePrice(data.price)
              setId(data.id)
              setBundleCategory(data.bundleCategory.name)
              setBundleCurrency(data.currency.symbol)
              setCurrent(data.active)
              setCurrencyID(data.currency.id)
              setCategoryID(data.bundleCategory.id)
              setGPID(data.groupPolicyId)
              setSelectedStatus(data.active ? false : true)

              openUpdateModal() //opens the modal

            }}><i className="material-icons text-sm me-2">edit</i>
              {
                data.active === true ? "Deactivate" : "Activate"
              }
            </a>
          </td>
        ) : ("")
      }
      {/* Update Modal */}

      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>
            Bundle Update
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Bundle Name</InputGroup.Text>
            <FormControl
              // value={this.state.currencyName}
              aria-label="Username"
              aria-describedby="basic-addon1"
              defaultValue={bundleName}
              name="bundleName"
              onChange={(e) => setBundleName(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon2">Description</InputGroup.Text>
            <FormControl
              // value={this.state.currencySymbol}
              aria-label="Username"
              aria-describedby="basic-addon2"
              defaultValue={bundleDescription}
              name="bundleDescription"
              onChange={(e) => setBundleDescription(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon2">Amount</InputGroup.Text>
            <FormControl
              // value={this.state.currencySymbol}
              aria-label="Username"
              aria-describedby="basic-addon2"
              defaultValue={bundlePrice}
              name="bundlePrice"
              onChange={(e) => setBundlePrice(e.target.value)}
            />
          </InputGroup>


          {/* Currency Dropdown */}

          <Dropdown as={ButtonGroup}>
            <Button variant="info">{currencyActioned}</Button>
            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
            <Dropdown.Menu>
              {renderedCurrency}
            </Dropdown.Menu>
          </Dropdown>
          <br />


          {/* Policy Dropdown */}

          <Dropdown as={ButtonGroup}>
            <Button variant="info">{gpActioned}</Button>
            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
            <Dropdown.Menu>
              {renderedGroupPolicy}
            </Dropdown.Menu>
          </Dropdown>
          <br />

          {/* Category Dropdown */}

          <Dropdown as={ButtonGroup}>
            <Button variant="info">{categoryActioned}</Button>
            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
            <Dropdown.Menu>
              {renderedCategory}
            </Dropdown.Menu>
          </Dropdown>

          <p>{updateStatus}</p>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



      {/* Activate / Deactivate Modal */}

      <Modal show={isUpdateOpen} onHide={closeUpdateModal} style={{ marginTop: 200 }}>
        <Modal.Body>
          <label>Are you sure you want to {current ? "Deactivate" : "Activate"} the {bundleName} bundle&#63;</label>
          <Button variant="info" onClick={handleUpdate} className="me-2">
            Proceed
          </Button>
          <Button variant="secondary" onClick={closeUpdateModal}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

