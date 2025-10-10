import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import Svg, { Path, Circle, Polyline, Rect } from 'react-native-svg';
const PADDING_HORIZONTAL = 20;
const USER_COLOR = '#2c3e50';
const ALERT_COLOR = '#FF8C00';
const LOGOUT_COLOR = 'red';
const ChevronLeft = ({ color = USER_COLOR, size = 28 }) => (
	<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<Polyline points="15 18 9 12 15 6"/>
	</Svg>
);
const ChevronRight = ({ color = "#A0A0A0", size = 24 }) => (
	<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<Polyline points="9 18 15 12 9 6"/>
	</Svg>
);
const UserIcon = ({ color, size = 22 }) => (
	<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><Circle cx="12" cy="7" r="4"/>
	</Svg>
);
const SecurityIcon = ({ color, size = 22 }) => (
	<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<Rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><Path d="M7 11V7a5 5 0 0 1 10 0v4"/>
	</Svg>
);
const BellIcon = ({ color, size = 22 }) => (
	<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><Path d="M13.73 21a2 2 0 01-3.46 0"/>
	</Svg>
);
const SupportIcon = ({ color, size = 22 }) => (
	<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<Path d="M3 18v-6a9 9 0 0 1 18 0v6"/><Path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
	</Svg>
);
const LogOutIcon = ({ color, size = 22 }) => (
	<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><Path d="M16 17l5-5-5-5M21 12H9"/>
	</Svg>
);
const userData = {
	name: 'Maria Carrizo',
	email: 'mariacarrizo@gmail.com',
	profilePic: 'https://via.placeholder.com/150/F08080/FFFFFF?text=MC'
};
const menuItems = [
	{ id: 'info', Icon: UserIcon, label: 'Información personal', action: 'personalInfo', color: USER_COLOR },
	{ id: 'security', Icon: SecurityIcon, label: 'Cuenta y seguridad', action: 'security', color: USER_COLOR },
	{ id: 'notifications', Icon: BellIcon, label: 'Notificaciones', action: 'notifications', color: USER_COLOR },
	{ id: 'support', Icon: SupportIcon, label: 'Ayuda y soporte', action: 'support', color: USER_COLOR },
	{ id: 'logout', Icon: LogOutIcon, label: 'Cerrar Sesión', action: 'logout', color: LOGOUT_COLOR }
];
const MenuItem = ({ Icon, label, color, onPress }) => (
	<TouchableOpacity style={styles.menuItemContainer} onPress={onPress}>
		<View style={styles.menuItemLeft}>
			<Icon color={color} size={22} style={styles.menuIcon} />
			<Text style={[styles.menuItemText, { color }]}>{label}</Text>
		</View>
		<ChevronRight color="#A0A0A0" size={24} />
	</TouchableOpacity>
);
const handleAction = (action, navigation) => {
	console.log(`Action taken: ${action}`);
	if (action === 'logout') {
		if (navigation) navigation.navigate('CerrarSesionProfesional');
		else console.warn('Error de Navegación: El objeto navigation es indefinido.');
	} else if (action === 'goBack' && navigation) {
		navigation.goBack();
	}
};
export const PerfilProfesional = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => handleAction('goBack', navigation)}>
						<ChevronLeft />
					</TouchableOpacity>
					<Text style={styles.headerTitle}>Mi perfil</Text>
				</View>
				<View style={styles.userInfoCard}>
					<Image source={{ uri: userData.profilePic }} style={styles.profileImage}/>
					<View style={styles.userInfoText}>
						<Text style={styles.userName}>{userData.name}</Text>
						<Text style={styles.userEmail}>{userData.email}</Text>
					</View>
				</View>
				<View style={styles.menuList}>
					{menuItems.map((item) => (
						<MenuItem key={item.id} Icon={item.Icon} label={item.label} color={item.color} onPress={() => handleAction(item.action, navigation)} />
					))}
				</View>
				<View style={styles.footer}>
					<View style={styles.teamInfo}>
						<UserIcon color="#666" size={16}/>
						<Text style={styles.teamText}>Los más copados team</Text>
					</View>
					<Text style={styles.versionText}>Version 1.0</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	safeArea: { flex: 1, backgroundColor: '#EAEAEA' },
	container: { flex: 1, paddingHorizontal: PADDING_HORIZONTAL, backgroundColor: '#EAEAEA' },
	header: { flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingBottom: 20 },
	headerTitle: { fontSize: 24, fontWeight: 'bold', color: USER_COLOR, marginLeft: 15 },
	userInfoCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 10, padding: 20, marginBottom: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
	profileImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
	userInfoText: { justifyContent: 'center' },
	userName: { fontSize: 18, fontWeight: '600', color: USER_COLOR },
	userEmail: { fontSize: 14, color: ALERT_COLOR, marginTop: 2 },
	menuList: { backgroundColor: '#FFF', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10 },
	menuItemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
	menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
	menuIcon: { marginRight: 10 },
	menuItemText: { fontSize: 16, fontWeight: '500' },
	footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1, marginBottom: 10, paddingHorizontal: 0 },
	teamInfo: { flexDirection: 'row', alignItems: 'center', opacity: 0.7 },
	teamText: { fontSize: 12, color: '#666', marginLeft: 5 },
	versionText: { fontSize: 12, color: '#666' }
});
export default PerfilProfesional;
