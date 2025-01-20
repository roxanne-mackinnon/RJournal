import './css/LeftRightView.css'

export function LeftRightView({left, right}) {
    return (
    <div className="left-right-view"><div>{left}</div><div>{right}</div></div>);
}