import React from 'react';

const SMSVoucherReportCard = (props) => {

    const { data } = props

    return (
        <>
            <td>
                <div className="d-flex px-2">
                    <div className="my-auto">
                    <h6 className="mb-0 text-sm">{data.voucherCode}</h6>
                    </div>
                </div>
            </td>
            <td className="align-middle ">
              <h6 className="mb-0 text-sm">{data.phoneNumber}</h6>                       
            </td>
        </>
        
    )
}

export default SMSVoucherReportCard