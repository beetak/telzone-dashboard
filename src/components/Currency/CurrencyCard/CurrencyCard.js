import {useState, useEffect} from 'react';
import { Button, ButtonGroup, Dropdown, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchAsyncCurrency, updateCurrency } from '../../../store/currency-slice';

const userRole = localStorage.getItem('role')

const CurrencyCard = (props) => {

  const [active, setActive] = useState('')
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [id, setId] = useState('')
  const [activeState, setActiveState] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [current, setCurrent] = useState('')
  const [actioned, setActioned] = useState('')
  const [currencyId, setCurrencyId] = useState('')


  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const dispatch = useDispatch()

  const handleUpdate = () => {
    dispatch(updateCurrency(
      {
        active,
        id,
        name,
        symbol,
        currencyId
      }
    ))
    closeModal()
  }
  const {data, index} = props 
  return (
    <>
      <td hidden>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{data.id}</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{data.name}</h6>
          </div>
        </div>
      </td>
      <td>
        <p clasName="text-xs font-weight-bold mb-0 w-10">{data.symbol}</p>
      </td>
      <td className="align-middle text-center">
        {/*<a className="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i className="material-icons text-sm me-2">delete</i>Delete</a>*/}
        <a className="btn btn-link text-dark px-3 mb-0" onClick={() => {

          let currencyStatus = ''
          if(data.active === true){
            currencyStatus = 'Active'
          }
          else {
            currencyStatus = 'Deactivated'
          }

          setName(data.name)
          setSymbol(data.symbol)
          setId(data.id)
          setActiveState(currencyStatus)
          setActive(data.active)
          setActioned(data.active? "Active": "Inactivate")

          openModal() //opens the modal

        }}><i className="material-icons text-sm me-2">edit</i>Edit</a>
      </td>

      {/* Update Modal */}

      <Modal show={isOpen} onHide={closeModal} style={{marginTop: 100}}>
        <Modal.Header>
          <Modal.Title>
            Currency Update
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Currency Name</InputGroup.Text>
            <FormControl
              // value={currencyName}
              aria-label="Username"
              aria-describedby="basic-addon1"
              defaultValue = {name}
              name = "name"
              onChange = {(e)=>setName(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon2">Currency Symbol</InputGroup.Text>
            <FormControl
              // value={currencySymbol}
              aria-label="Username"
              aria-describedby="basic-addon2"
              defaultValue = {symbol}
              name = "symbol"
              onChange = {(e)=>setSymbol(e.target.value)}
            />
          </InputGroup>
          <Dropdown as={ButtonGroup}>
            <Button variant="info">{actioned}</Button>
            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item
              onClick={
                () => {
                  setActive(true)
                  setActioned('Active')
                }
              }
              >Activate
              </Dropdown.Item>
              <Dropdown.Item
              onClick={
                () => {
                  setActive(false)
                  setActioned('Inactivate')
                }
              }
              >Deactivate
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown><br/>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CurrencyCard;
