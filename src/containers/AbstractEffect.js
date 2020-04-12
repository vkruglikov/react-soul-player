import PropTypes from 'prop-types';

const AbstractEffect = ({timeStart, timeEnd, children, currentTime}) => {
    const isVisible = currentTime > timeStart && currentTime < timeEnd;

    return isVisible && children;
};

AbstractEffect.propTypes = {
    timeStart: PropTypes.number,
    timeEnd: PropTypes.number,
}

export default AbstractEffect;