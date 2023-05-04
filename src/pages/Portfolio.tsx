import { FunctionComponent, useEffect} from "react";

const Portfolio: FunctionComponent = () => {
    useEffect(() => {
        document.title = 'Portfolio'
    }, []);
    return (
        <div>
            <h1>Portfolio</h1>
        </div>
    );    
};
    
export default Portfolio;
