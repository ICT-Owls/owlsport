import React from 'react';
import { IconButton, ListItemText, MenuItem, MenuList, Divider } from '@mui/material';

export default function SidebarView(props) {
	const isLoggedIn = props.isLoggedIn;

	//These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if necessary)
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
						<Divider black />
					</MenuItem>
				</MenuList>

				<Divider/>
				{
					isLoggedIn ?
						(
							<MenuList>
								<MenuItem onClick={() => window.location.pathname = '/logout'}>
									<ListItemText primaryTypographyProps={{
										fontSize: 22,
										color: 'primary.secondary',
									}}>Logout</ListItemText>
								</MenuItem>
								<MenuItem onClick={() => window.location.pathname = '/account'}>
									<ListItemText primaryTypographyProps={{
										fontSize: 22,
										color: 'primary.secondary',
									}}>Account</ListItemText>
								</MenuItem>
							</MenuList>
						) :
						(
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
						)
				}
			</div>
		</div>
	);
}
