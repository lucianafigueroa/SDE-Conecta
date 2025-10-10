import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Image, TextInput, ScrollView, Modal, KeyboardAvoidingView, Platform, Dimensions 
} from 'react-native';
import Svg, { Path, Circle, Polyline } from 'react-native-svg';

const USER_COLOR = '#2c3e50';
const ALERT_COLOR = '#FF8C00';
const RED_ERROR = '#FF0000';
const PADDING_HORIZONTAL = 20;
const screenWidth = Dimensions.get('window').width;

// --- ICONOS ---
const ChevronLeft = ({ color = USER_COLOR, size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Polyline points="15 18 9 12 15 6"/>
  </Svg>
);

const EditIcon = ({ color = USER_COLOR, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  </Svg>
);

const AddCircleIcon = ({ color = ALERT_COLOR, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10"/><Path d="M12 8v8m-4-4h8"/>
  </Svg>
);

const ErrorIcon = ({ color = RED_ERROR, size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10"/><Path d="M12 16v-4M12 8h.01"/>
  </Svg>
);

const CrossIcon = ({ color = USER_COLOR, size = 28 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M18 6L6 18M6 6l12 12"/>
  </Svg>
);

export const PerfilInfoPersonal = () => {
  const [data, setData] = useState({
    name: 'Maria Carrizo',
    email: 'mariacarrizo@gmail.com',
    phone: '(964) 677-7646',
    address: '34076 NW 120th ave',
  });

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhotoModalVisible, setPhotoModalVisible] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  const userData = {
    profilePic: 'https://via.placeholder.com/150/F08080/FFFFFF?text=MC',
  };

  const handleUpdate = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleEditPress = (field) => {
    setCurrentField(field);
    setCurrentValue(data[field]);
    setEditModalVisible(true);
  };

  const handleEmailTouch = () => {
    if (!isEmailVerified) setErrorModalVisible(true);
  };

  const handleAction = (action) => console.log(`Action: ${action}`);

  const FieldItem = ({ label, value, onPress, icon }) => (
    <TouchableOpacity onPress={onPress} style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.fieldInputWrapper, styles.readOnlyInput]}>
        <Text style={styles.textInput}>{value}</Text>
        {icon && <View style={styles.fieldIcon}>{icon}</View>}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => handleAction('goBack')}><ChevronLeft /></TouchableOpacity>
              <Text style={styles.headerTitle}>Mi perfil</Text>
            </View>

            {/* Imagen */}
            <View style={styles.profileSection}>
              <TouchableOpacity onPress={() => setPhotoModalVisible(true)}>
                <Image source={{ uri: userData.profilePic }} style={styles.profileImage} />
                <View style={styles.cameraIconBadge}><EditIcon color="white" size={16} /></View>
              </TouchableOpacity>
            </View>

            {/* Campos */}
            <View style={styles.fieldsContainer}>
              <FieldItem label="Nombre Completo" value={data.name} onPress={() => handleEditPress('name')} />
              <FieldItem
                label="Email"
                value={data.email}
                onPress={handleEmailTouch}
                icon={!isEmailVerified ? <ErrorIcon color={RED_ERROR} /> : null}
              />
              <FieldItem label="Número de teléfono" value={data.phone} onPress={() => handleEditPress('phone')} />
              <FieldItem label="Dirección primaria" value={data.address} onPress={() => handleEditPress('address')} />
              <TouchableOpacity onPress={() => handleAction('addNewAddress')} style={styles.addNewAddress}>
                <AddCircleIcon color={ALERT_COLOR} /><Text style={styles.addNewAddressText}>Añadir nueva dirección</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal Edición */}
      <Modal animationType="slide" transparent visible={editModalVisible} onRequestClose={() => setEditModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setEditModalVisible(false)}>
          <View style={styles.modalCenteredView}>
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'}>
                <View style={[styles.editModalView, { width: screenWidth * 0.9 }]}>
                  <Text style={styles.editModalLabel}>
                    Editar {currentField==='name'?'Nombre':currentField==='phone'?'Teléfono':'Dirección'}
                  </Text>
                  <TextInput 
                    value={currentValue} 
                    onChangeText={setCurrentValue} 
                    style={[styles.editTextInput, { height: 45 }]}
                    multiline={false} // ✅ Dirección ya no puede hacer salto de línea
                    keyboardType={currentField==='phone'?'phone-pad':'default'}
                    autoFocus
                  />
                  <TouchableOpacity style={styles.modalButtonPrimary} onPress={() => { handleUpdate(currentField, currentValue); setEditModalVisible(false); }}>
                    <Text style={styles.modalButtonPrimaryText}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalButtonPrimary,{backgroundColor:'#CCC',marginTop:10}]} onPress={()=>setEditModalVisible(false)}>
                    <Text style={[styles.modalButtonPrimaryText,{color:USER_COLOR}]}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal Foto */}
      <Modal animationType="slide" transparent visible={isPhotoModalVisible} onRequestClose={()=>setPhotoModalVisible(false)}>
        <TouchableWithoutFeedback onPress={()=>setPhotoModalVisible(false)}>
          <View style={styles.modalBottomView}>
            <TouchableWithoutFeedback>
              <View style={styles.photoModalView}>
                <TouchableOpacity onPress={()=>setPhotoModalVisible(false)} style={styles.photoModalCloseButton}><CrossIcon /></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleAction('selectFromGallery')} style={styles.photoModalOption}><Text style={styles.photoModalOptionText}>Elegir desde la galería</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>handleAction('takePhoto')} style={styles.photoModalOption}><Text style={styles.photoModalOptionText}>Tomar foto</Text></TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal Email */}
      <Modal animationType="fade" transparent visible={isErrorModalVisible} onRequestClose={()=>setErrorModalVisible(false)}>
        <TouchableWithoutFeedback onPress={()=>setErrorModalVisible(false)}>
          <View style={styles.modalCenteredView}>
            <TouchableWithoutFeedback>
              <View style={styles.errorModalView}>
                <View style={styles.errorModalIconCircle}><Text style={styles.exclamationMark}>!</Text></View>
                <Text style={styles.errorModalTitle}>¡Tu e-mail no está verificado!</Text>
                <TouchableOpacity style={styles.modalButtonPrimary} onPress={()=>handleAction('verifyEmail')}>
                  <Text style={styles.modalButtonPrimaryText}>Verificar email</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea:{flex:1,backgroundColor:'#EAEAEA'}, 
  scrollContent:{paddingBottom:40}, 
  container:{flex:1,paddingHorizontal:PADDING_HORIZONTAL,backgroundColor:'#EAEAEA'},
  header:{flexDirection:'row',alignItems:'center',paddingTop:50,paddingBottom:20}, 
  headerTitle:{fontSize:24,fontWeight:'bold',color:USER_COLOR,marginLeft:15},
  profileSection:{alignItems:'center',marginBottom:30}, 
  profileImage:{width:100,height:100,borderRadius:50,borderWidth:3,borderColor:'#FFF'}, 
  cameraIconBadge:{position:'absolute',bottom:0,right:0,backgroundColor:'#357C45',width:25,height:25,borderRadius:12.5,justifyContent:'center',alignItems:'center',borderWidth:2,borderColor:'#FFF'},
  fieldsContainer:{paddingHorizontal:0}, 
  fieldContainer:{marginBottom:20}, 
  fieldLabel:{fontSize:16,color:USER_COLOR,marginBottom:8,fontWeight:'500'},
  fieldInputWrapper:{flexDirection:'row',alignItems:'center',backgroundColor:'#FFF',borderRadius:8,paddingHorizontal:15,height:50}, 
  readOnlyInput:{borderWidth:1,borderColor:'#F0F0F0'}, 
  textInput:{flex:1,fontSize:16,color:USER_COLOR,paddingVertical:0}, 
  fieldIcon:{marginLeft:10,padding:5},
  addNewAddress:{flexDirection:'row',alignItems:'center',marginTop:15,paddingHorizontal:15}, 
  addNewAddressText:{marginLeft:8,fontSize:16,color:ALERT_COLOR,fontWeight:'bold'},
  modalCenteredView:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}, 
  modalBottomView:{flex:1,justifyContent:'flex-end',backgroundColor:'rgba(0,0,0,0.5)'},
  editModalView:{backgroundColor:'white',borderRadius:20,paddingVertical:20,paddingHorizontal:20,alignItems:'center'},
  editModalLabel:{fontSize:18,fontWeight:'bold',marginBottom:15,color:USER_COLOR,textAlign:'center'},
  editTextInput:{width:'100%',borderWidth:1,borderColor:'#CCC',borderRadius:8,padding:10,fontSize:16,color:USER_COLOR,marginBottom:15,textAlignVertical:'center'},
  photoModalView:{width:'100%',backgroundColor:'white',borderTopLeftRadius:20,borderTopRightRadius:20,paddingVertical:20,paddingHorizontal:25,alignItems:'center'},
  photoModalCloseButton:{position:'absolute',top:15,right:20,padding:5,zIndex:1}, 
  photoModalOption:{width:'100%',paddingVertical:18,borderBottomWidth:1,borderBottomColor:'#EEE',alignItems:'center'}, 
  photoModalOptionText:{fontSize:18,color:USER_COLOR,fontWeight:'500'},
  errorModalView:{width:'90%',backgroundColor:'white',borderRadius:20,padding:30,alignItems:'center'},
  errorModalIconCircle:{width:80,height:80,borderRadius:40,backgroundColor:RED_ERROR,justifyContent:'center',alignItems:'center',marginBottom:20},
  exclamationMark:{color:'white',fontSize:40,fontWeight:'bold',lineHeight:50},
  errorModalTitle:{fontSize:20,fontWeight:'bold',marginBottom:20,textAlign:'center',color:USER_COLOR},
  modalButtonPrimary:{backgroundColor:USER_COLOR,borderRadius:8,padding:15,width:'100%',alignItems:'center'},
  modalButtonPrimaryText:{color:'white',fontWeight:'bold',fontSize:16},
});

export default PerfilInfoPersonal;
