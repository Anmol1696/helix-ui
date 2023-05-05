import { useEffect } from "react";
import type { NextPage } from 'next'
import CryptoTable from "../components/CryptoTable";

const BuySell: NextPage = () => {
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
