import React, {useState, useEffect} from "react";
import Bundle from './bundle'
import axios from 'axios'

const Bundles = () => {
    const [bundles, setBundles] = useState([])
    const [loadingState, setLoadingState] = useState('')

    useEffect(() => {
      getBundles()
    }, []);
    
    const getBundles = ()=>{
        const url = `http://localhost:8082/smart-wifi/bundle/`; // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency
        setLoadingState('Loading vouchers...')
        axios
            .get(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(({ data }) => {
              var count = Object.keys(data.data).length
              if(count<=0){
                setLoadingState("No Bundles Found")
              }
              else{
                setBundles(data.data)
                setLoadingState("")
              }
            })
            .catch(err => {
                setLoadingState("Sorry we encountered an error, Please refresh page.")
            });
      }
  return (
    <>
    {bundles.map((item, index) => (
        <tr key={index}>
            <Bundle
                id={item.id}
                imgUrl={item.image}
                name={item.name}
                price={item.price}
                description={item.description}
                currency={item.currency.symbol}
                policy={item.groupPolicyId}
                product = {item.id}
            />
        </tr>
        ))}
    </>
  );
};

export default Bundles;

