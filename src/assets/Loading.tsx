import '../css/Loading.css';

export default function Loading() {
    

    return (
    <div className="spinner">
       {[-0.4,-0.3,-0.2,-0.1,0].map(x => <div className="ball" style={{animationDelay: `${x}s`}}></div>)}
    </div>
    );
}