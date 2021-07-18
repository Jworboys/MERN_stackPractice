import React from 'react';
import ReactDOM from 'react-dom';

import './SlideDrawer.css';

const SlideDrawer = props => {
	const content = <aside className='side-drawer'>{props.childern}</aside>;

	return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SlideDrawer;
