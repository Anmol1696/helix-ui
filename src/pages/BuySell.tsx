import { FunctionComponent, useEffect } from "react";
import CryptoTable from "../components/CryptoTable";

const BuySell: FunctionComponent = () => {
    useEffect(() => {
        document.title = 'Buy and Sell'
    }, []);
    return (
        <div>
            <h1>Buy and Sell</h1>
            <CryptoTable />
        </div>
    );    
};
    
export default BuySell;
