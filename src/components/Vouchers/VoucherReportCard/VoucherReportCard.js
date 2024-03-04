import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { cartActions, getBtnState } from '../../../store/cart-slice';
import { focActions } from '../../../store/foc-slice';

const userRole = localStorage.getItem('role')

const VoucherReportCard = (props) => {

    const btnState = useSelector(getBtnState)

    const {data, page} = props
    console.log("page ", page)
    let name = data.name
    let id = data.id
    let price = data.price
    
    const dispatch  = useDispatch()
    const addToCart = () => {
      page==='sales' ?
      dispatch(
        cartActions.addToCart({
          name,
          id,
          price
        })
      ):
      dispatch(
        focActions.addToFocCart({
          name,
          id,
          price
        })
      )
    }

    // const convertDate = (dateCreated) => {
    //   const dateString = new Date(dateCreated);
    //   const day = dateString.toLocaleDateString('en-GB', { day: 'numeric' });
    //   const month = dateString.toLocaleDateString('en-GB', { month: 'long' });
    //   const year = dateString.toLocaleDateString('en-GB', { year: 'numeric' });
    //   // const hours = dateString.getHours().toString().padStart(2, '0');
    //   // const minutes = dateString.getMinutes().toString().padStart(2, '0');
      
    //   return `${day} ${month} ${year}`;
    //   // return `${day} ${month} ${year} \t\t ${hours}:${minutes}`;
    // };

    const padZero = (value) => {
      return value.toString().padStart(2, '0');
    };
    
    const convertDate = (dateCreated) => {
      const dateString = new Date(dateCreated);
      const day = dateString.getDate().toString().padStart(2, '0');
      const month = (dateString.getMonth() + 1).toString().padStart(2, '0');
      const year = dateString.getFullYear().toString().slice(-2);
      
      return `${day}/${month}/${year}`;
    }
    const convertDatenTime = (dateCreated) => {
      const dateString = new Date(dateCreated);
      const day = dateString.toLocaleDateString('en-GB', { day: '2-digit' });
      const month = dateString.toLocaleDateString('en-GB', { month: '2-digit' });
      const year = dateString.toLocaleDateString('en-GB', { year: '2-digit' });
      const hours = dateString.getHours().toString().padStart(2, '0');
      const minutes = dateString.getMinutes().toString().padStart(2, '0');
      const seconds = dateString.getSeconds().toString().padStart(2, '0');
      
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    // const convertTime = (timeCreated) => {
    //   const timeArray = timeCreated;
    //   const newTime = timeArray.join(':');
      
    //   return newTime;
    // }

    const convertTime = (timeCreated) => {
      // Convert milliseconds to seconds
      let seconds = Math.floor(timeCreated / 1000);
    
      // Calculate hours, minutes, and remaining seconds
      const hours = Math.floor(seconds / 3600);
      seconds %= 3600;
      const minutes = Math.floor(seconds / 60);
      seconds %= 60;
    
      const formattedTime = `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
      return formattedTime;
    };

    const convertDuration = (duration) => {
      // Define durations in seconds
      const secondsPerMinute = 60;
      const secondsPerHour = 60 * secondsPerMinute;
      const secondsPerDay = 24 * secondsPerHour;
      const secondsPerMonth = 30 * secondsPerDay;
    
      // Calculate months, days, hours, and remaining minutes
      const months = Math.floor(duration / secondsPerMonth);
      duration %= secondsPerMonth;
      const days = Math.floor(duration / secondsPerDay);
      duration %= secondsPerDay;
      const hours = Math.floor(duration / secondsPerHour);
      duration %= secondsPerHour;
      const minutes = Math.floor(duration / secondsPerMinute);

      const formattedDate = `${months} months, ${days} days, ${hours} hours, ${minutes} munites`;
      return formattedDate;
    };

    return (
        <>
            <td>
                <div className="d-flex px-2">
                    <div className="my-auto">
                    <h6 className="mb-0 text-sm">{data.vouchers.voucherCode}</h6>
                    </div>
                </div>
            </td>
            <td className="align-middle ">
              <h6 className="mb-0 text-sm">{data.bundles.name}</h6>                       
            </td>
            <td className="align-middle ">
              <h6 className="mb-0 text-sm">$ {(Math.round(data.bundles.price*100) / 100).toFixed(2)}</h6>                       
            </td>
            <td className="align-middle">
              {data.order.dateCreated > new Date('2023-04-14') ? (
                <h6 className="mb-0 text-sm">
                  {convertDate(data.order.dateCreated)} {data.order.timeCreated?convertTime(data.order.timeCreated):""}
                </h6>
              ):<h6 className="mb-0 text-sm">Unavailable</h6>}                       
            </td>
            <td className="align-middle">
              <h6 className="mb-0 text-sm">{data.vouchers.dateUsed?convertDatenTime(data.vouchers.dateUsed):"Unavailbale"}</h6>                       
            </td>
            {
              userRole !== 'Sales Admin' &&
              <td className="align-middle">
                <h6 className="mb-0 text-sm">{ data.order.adminPortalUsersId === 1?"Unavailable":<>{data.order.firstName} {data.order.surname}</> }</h6>                       
              </td>
            }
            
            <td className="align-middle">
              <h6 className={`${data.vouchers.used ?"text-danger ":"text-info "}mb-0 text-sm`}>{data.vouchers.used?"Used":"Not Used"}</h6> 
            </td>
        </>
        
    )
}

export default VoucherReportCard

const disable = {
  pointerEvents: 'none',
  cursor: 'default'
}
const enable = {
  cursor: 'pointer'
}
