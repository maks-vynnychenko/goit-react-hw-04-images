import { ThreeCircles } from 'react-loader-spinner';
import loaderStyled from './Loader.module.css'
export const Loader = () => {
  return (
    <div className={loaderStyled.loader}>
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="red"
        innerCircleColor="green"
        middleCircleColor="blue"
      />
    </div>
  );
};