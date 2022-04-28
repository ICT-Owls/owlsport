import React from 'react';
import { IconButton, ListItemText, MenuItem, MenuList } from '@mui/material';

export default function SidebarView() {
	//These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
	return (
		<div className= 'sidebar'>
			<IconButton color="secondary" aria-label="Search" component="span"
						onClick={() => window.location.pathname = '/'}>
				<img src="Solid_Logotype.png" className="h-10" alt="" />
			</IconButton>
			{/*<div className='logo'>*/}
			{/*	<img src='Solid_Logotype.png' alt='logo'/>*/}
			{/*</div>*/}

			<div className= 'sidebar_first'>
				<MenuList>
					<MenuItem onClick={() => window.location.pathname = '/events'}>
						<ListItemText primaryTypographyProps={{
							fontSize: 22,
							color: 'primary.secondary',
						}}>Events</ListItemText>
					</MenuItem>
					<MenuItem onClick={() => window.location.pathname = '/about'}>
						<ListItemText primaryTypographyProps={{
							fontSize: 22,
							color: 'primary.secondary',
						}}>About</ListItemText>
					</MenuItem>
					<MenuItem onClick={() => window.location.pathname = '/whatever'}>
						<ListItemText primaryTypographyProps={{
							fontSize: 22,
							color: 'primary.secondary',
						}}>Whatever Else</ListItemText>
					</MenuItem>
				</MenuList>

				<MenuList>
					<MenuItem onClick={() => window.location.pathname = '/login'}>
						<ListItemText primaryTypographyProps={{
							fontSize: 22,
							color: 'primary.secondary',
						}}>Login</ListItemText>
					</MenuItem>
					<MenuItem onClick={() => window.location.pathname = '/signup'}>
						<ListItemText primaryTypographyProps={{
							fontSize: 22,
							color: 'primary.secondary',
						}}>Sign Up</ListItemText>
					</MenuItem>
				</MenuList>
				{/*<ul className='sidebar_ul'>*/}
				{/*	<li key='0'*/}
				{/*		className = 'row'*/}
				{/*		onClick={() => window.location.pathname = '/events'}>*/}
				{/*		<div>*/}
				{/*			Events*/}
				{/*		</div>*/}
				{/*	</li>*/}
				{/*	<li key='1' onClick={() => window.location.pathname = '/about'}>*/}
				{/*		<div>*/}
				{/*			About Us*/}
				{/*		</div>*/}
				{/*	</li>*/}
				{/*	<li key='2' onClick={() => window.location.pathname = '/whatever'}>*/}
				{/*		<div>*/}
				{/*			Whatever Else*/}
				{/*		</div>*/}
				{/*	</li>*/}
				{/*</ul>*/}
			</div>

			{/*<div className='sidebar_second'>*/}
			{/*	<ul  className='sidebar_ul'>*/}
			{/*		<li key='3' onClick={() => window.location.pathname = '/login'}>*/}
			{/*			<div>*/}
			{/*				Login*/}
			{/*			</div>*/}
			{/*		</li>*/}
			{/*		<li key='4' onClick={() => window.location.pathname = '/signup'}>*/}
			{/*			<div>*/}
			{/*				Sign Up*/}
			{/*			</div>*/}
			{/*		</li>*/}
			{/*	</ul>*/}
			{/*</div>*/}
		</div>
	);
}
