import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	Avatar,
} from '@chakra-ui/react';
import {
	HamburgerIcon,
	CloseIcon,
	ChevronDownIcon,
	ChevronRightIcon,
} from '@chakra-ui/icons';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default function Header() {
	const { authStatus, user } = useAuth();
	const navigate = useNavigate();
	const { isOpen, onToggle } = useDisclosure();
	const userJWT = authStatus
		? jwtDecode(sessionStorage.getItem('token') || '')
		: null;

	return (
		<Box>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align={'center'}
			>
				<Flex
					flex={{ base: 1, md: 'auto' }}
					ml={{ base: -2 }}
					display={{ base: 'flex', md: 'none' }}
				>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
						}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex
					flex={{ base: 1 }}
					justify={{ base: 'center', md: 'start' }}
					align="center"
				>
					<Text
						textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
						fontFamily={'heading'}
						fontSize="xl"
						cursor={'pointer'}
						color={useColorModeValue('gray.800', 'white')}
						onClick={() => navigate('/')}
					>
						Logo
					</Text>

					<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav
							{...{ authStatus: ((userJWT as any)?.role || '') === 'Admin' }}
						/>
					</Flex>
				</Flex>

				{!authStatus ? (
					<Stack
						flex={{ base: 1, md: 0 }}
						justify={'flex-end'}
						direction={'row'}
						spacing={6}
					>
						<Button
							as={'a'}
							display={{ base: 'none', md: 'inline-flex' }}
							fontSize={'md'}
							fontWeight={600}
							color={'white'}
							bg={'blue.500'}
							href={'/login'}
							_hover={{
								bg: 'blue.400',
							}}
						>
							Sign In
						</Button>
					</Stack>
				) : (
					<Stack
						flex={{ base: 1, md: 0 }}
						justify={'flex-end'}
						direction={'row'}
						spacing={6}
					>
						<Avatar
							animation={'ease-in-out'}
							size={'md'}
							name={(userJWT as any).unique_name || 'User'}
						/>
						<Button
							as={'a'}
							display={{ base: 'none', md: 'inline-flex' }}
							fontSize={'md'}
							fontWeight={600}
							color={'white'}
							bg={'blue.500'}
							href={'/'}
							onClick={() => {
								sessionStorage.removeItem('token');
								window.location.pathname = '/';
							}}
							_hover={{
								bg: 'blue.400',
							}}
						>
							Log Out
						</Button>
					</Stack>
				)}
			</Flex>
			<Collapse in={isOpen} animateOpacity>
				<MobileNav
					{...{ authStatus: ((userJWT as any)?.role || '') === 'Admin' }}
				/>
			</Collapse>
		</Box>
	);
}

const DesktopNav = ({ authStatus }: { authStatus: boolean }) => {
	const linkColor = useColorModeValue('gray.600', 'gray.200');
	const linkHoverColor = useColorModeValue('gray.800', 'white');
	const popoverContentBgColor = useColorModeValue('white', 'gray.800');

	return (
		<Stack direction={'row'} spacing={4}>
			{NAV_ITEMS.filter((v) =>
				authStatus ? v : !v.label.toLowerCase().includes('admin')
			).map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<Link
								href={navItem.href ?? '#'}
								fontSize={'md'}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: 'none',
									color: linkHoverColor,
								}}
							>
								{navItem.label}
							</Link>
						</PopoverTrigger>
						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={'xl'}
								bg={popoverContentBgColor}
								p={4}
								rounded={'xl'}
								minW={'sm'}
							>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
	return (
		<Link
			href={href}
			role={'group'}
			display={'block'}
			p={2}
			rounded={'md'}
			_hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
		>
			<Stack direction={'row'} align={'center'}>
				<Box>
					<Text
						transition={'all .3s ease'}
						_groupHover={{ color: 'pink.400' }}
						fontWeight={500}
					>
						{label}
					</Text>
					<Text fontSize={'sm'}>{subLabel}</Text>
				</Box>
				<Flex
					transition={'all .3s ease'}
					transform={'translateX(-10px)'}
					opacity={0}
					_groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
					justify={'flex-end'}
					align={'center'}
					flex={1}
				>
					<Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	);
};

const MobileNav = ({ authStatus }: { authStatus: boolean }) => {
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			p={4}
			display={{ md: 'none' }}
		>
			{NAV_ITEMS.filter((v) =>
				authStatus ? v : !v.label.toLowerCase().includes('admin')
			).map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? '#'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none',
				}}
			>
				<Text
					fontWeight={600}
					color={useColorModeValue('gray.600', 'gray.200')}
				>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}
				>
					{children &&
						children.map((child) => (
							<Link key={child.label} py={2} href={child.href}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

interface NavItem {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: 'Categories',
		href: '/categories',
	},
	{
		label: 'Authors',
		href: '/authors',
	},
	{
		label: 'Admin Panel',
		href: '/admin',
	},
];
