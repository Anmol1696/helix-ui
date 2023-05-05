import { useEffect } from "react";
import type { NextPage } from 'next'
import CryptoTable from "../components/CryptoTable";

const BuySell: NextPage = () => {
    useEffect(() => {
        document.title = 'Buy and Sell'
    }, []);
    return (
        <div style={{ margin: '20px 20px 50px 50px'}}>
            <div style={{ textAlign: 'center'}}>
                <h1>Cryptocurrency Market Caps</h1>
            </div>
            <div>
                <CryptoTable />
            </div>
        </div>
    );    
};
    
export default BuySell;
