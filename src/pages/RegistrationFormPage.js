import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  Picker,
  Keyboard,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation'
import ImagePicker from 'react-native-image-picker';

/**
 *  Import Common
 */
import { Container, ContainerSection, Spinner, Input, Button } from './../components/common'
import { BASE_URL, COLOR } from '../shared/lb.config';

class RegistrationFormPage extends Component {
  static navigationOptions = {
    title: 'Pendaftaran Akun',
    headerRight: <View />
  }

  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      loading: null,

      organization: '',
      organizationType: '',
      addressInstitution: '',
      npwp: '',
      email: '',

      name: '',
      idNumber: '',
      address: '',
      phone: '',
      username: '',
      password: '',
      idCity: '',
      dataCity: '',


      idPhoto: null,
      npwpPhoto: null,
      profilePhoto: null,

      pathKtp: null,
      pathNpwp: null,
      pathProfile: null
    };
  }


  componentWillMount() {
    this.setState({ loading: true });
    axios.get(`${BASE_URL}/cities`, {
      params: {
        pageSize: 30,
        sorting: 'ASC'
      }
    })
      .then(response => {
        res = response.data.data
        this.setState({
          dataCity: res,
          loading: false
        })
        console.log(res, 'Data City');
      })
      .catch(error => {
        console.log(error, 'Error');
        this.setState({ loading: false })
        alert('Koneksi internet bermasalah on item selected')
      })
  }

  onChangeInput = (name, v) => {
    this.setState({ [name]: v })
  }

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  register = () => {
    Keyboard.dismiss()
    const { navigate } = this.props.navigation;
    this.setState({ loading: true })

    const dataPhoto = new FormData();
    dataPhoto.append('name', this.state.name);
    dataPhoto.append('email', this.state.email);
    dataPhoto.append('username', this.state.username);
    dataPhoto.append('password', this.state.password);
    dataPhoto.append('phone', this.state.phone);
    dataPhoto.append('organization', this.state.organization);
    dataPhoto.append('organizationType', this.state.organizationType);
    dataPhoto.append('idNumber', this.state.idNumber);
    dataPhoto.append('address', this.state.address);
    dataPhoto.append('idPhoto', {
      uri: this.state.idPhoto.uri,
      type: 'image/jpeg',
      name: 'ktpImage.jpeg'
    });
    dataPhoto.append('npwp', this.state.npwp);
    dataPhoto.append('photo', {
      uri: this.state.profilePhoto.uri,
      type: 'image/jpeg',
      name: 'profile.jpeg'
    });
    dataPhoto.append('npwpPhoto', {
      uri: this.state.npwpPhoto.uri,
      type: 'image/jpeg',
      name: 'npwpImage.jpeg'
    });

    console.log(dataPhoto, 'Data formData');
    console.log(this.state, 'Data State');
    axios.post(`${BASE_URL}/buyer/register`,
      dataPhoto
      , {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(response => {
        console.log(response, 'Response');
        console.log(response.status)
        this.setState({ loading: false })
        navigate('Home');

        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' })
          ]
        })
        this.props.navigation.dispatch(resetAction)

        Alert.alert('Registrasi berhasil', `Silahkan cek email anda ${this.state.email} untuk verifikasi email`, [])
      })
      .catch(error => {
        this.setState({ loading: false })
        if (error.response) {
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
        }
        else {
          ToastAndroid.show('Koneksi internet bermasalah', ToastAndroid.SHORT)
        }
      })
  }

  selectPhotoTappedNPWP() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };


    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          npwpPhoto: source,
          pathNpwp: source
        });
      }
    });
  }

  selectPhotoTappedKTP() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };


    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          idPhoto: source,
          pathKtp: source
        });
      }
    });
  }


  selectPhotoTappedProfile() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };


    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          profilePhoto: source,
          pathProfile: source
        });
      }
    });
  }

  renderPickerCity = () => {
    if (this.state.dataCity === '') {
      return <Picker.Item label='Pilih Kota' value='0' />
    } else {
      const resultRender = this.state.dataCity;
      return resultRender.map((data, index) => {
        return <Picker.Item label={data.name} value={data.id} key={index} />
      })
    }
  }

  renderButton = () => {
    if (this.state.loading) {
      return <Spinner size='large' />
    }

    return (
      <Button
        onPress={
          () => Alert.alert(
            '',
            'Yakin data anda sudah benar ?',
            [
              { text: 'Tidak', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'Ya', onPress: () => this.register() },
            ]
          )
        }
      >
        Daftar
      </Button>
    )
  }

  render() {
    const {
      organization,
      organizationType,
      addressInstitution,
      npwp,
      email,

      name,
      idNumber,
      address,
      phone,
      username,
      password,
      idCity
    } = this.state

    if (this.state.loading) {
      return <Spinner size='large' />
    }


    return (
      <View>
        <ScrollView
          style={styles.containerStyle}
          keyboardShouldPersistTaps="always"
        >
          <Container>
            <ContainerSection>
              <Text style={styles.headerStyle}>
                Informasi Lembaga
              </Text>
            </ContainerSection>
            <ContainerSection>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerTextStyle}>Jenis Lembaga</Text>
                <View style={styles.pickerStyle}>
                  <Picker
                    selectedValue={organizationType}
                    onValueChange={v => this.onChangeInput('organizationType', v)}
                  >
                    <Picker.Item label='PT' value='PT' />
                    <Picker.Item label='CV' value='CV' />
                    <Picker.Item label='Lainnya' value='Lainnya' />
                  </Picker>
                </View>
              </View>
            </ContainerSection>
            <ContainerSection>
              <Input
                label='Nama Lembaga'
                value={organization}
                onChangeText={v => this.onChangeInput('organization', v)}
              />
            </ContainerSection>
            <ContainerSection>
              <Input
                label='NPWP (Nomor Pokok Wajib Pajak)'
                value={npwp}
                keyboardType="numeric"
                onChangeText={v => this.onChangeInput('npwp', v)}
              />
            </ContainerSection>

            <Text style={[styles.pickerTextStyle, { marginLeft: 5, marginTop: 10 }]}>Unggah Foto NPWP</Text>
            <ContainerSection>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={this.selectPhotoTappedNPWP.bind(this)}>
                  <View>
                    {this.state.pathNpwp === null ?
                      <Image
                        source={require('../assets/images/ic_add_a_photo.png')}
                      />
                      :
                      <Image style={{ height: 200, width: 300 }} source={this.state.pathNpwp} />
                    }
                  </View>
                </TouchableOpacity>
              </View>
            </ContainerSection>
            <ContainerSection>
              <Input
                label='Alamat'
                value={addressInstitution}
                onChangeText={v => this.onChangeInput('addressInstitution', v)}
              />
            </ContainerSection>
          </Container>

          <Container>
            <ContainerSection>
              <Text style={styles.headerStyle}>
                Informasi Personal
              </Text>
            </ContainerSection>

            <Text style={[styles.pickerTextStyle, { marginLeft: 5, marginTop: 10 }]}>Unggah Foto Profile</Text>
            <ContainerSection>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={this.selectPhotoTappedProfile.bind(this)}>
                  <View>
                    {this.state.pathProfile === null ?
                      <Image
                        source={require('../assets/images/ic_add_a_photo.png')}
                      />
                      :
                      <Image
                        style={{ height: 200, width: 300 }}
                        source={this.state.pathProfile}
                      />
                    }
                  </View>
                </TouchableOpacity>
              </View>
            </ContainerSection>

            <ContainerSection>
              <Input
                label='Nama Lengkap'
                placeholder='contoh: Ahmad Darudi'
                value={name}
                onChangeText={v => this.onChangeInput('name', v)}
              />
            </ContainerSection>
            <ContainerSection>
              <Input
                label='No. KTP (Kartu Tanda Penduduk)'
                placeholder='1050304562356723'
                keyboardType="numeric"
                value={idNumber}
                onChangeText={v => this.onChangeInput('idNumber', v)}
              />
            </ContainerSection>

            <Text style={[styles.pickerTextStyle, { marginLeft: 5, marginTop: 10 }]}>Unggah Foto KTP</Text>
            <ContainerSection>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={this.selectPhotoTappedKTP.bind(this)}>
                  <View>
                    {this.state.pathKtp === null ?
                      <Image
                        source={require('../assets/images/ic_add_a_photo.png')}
                      />
                      :
                      <Image
                        style={{ height: 200, width: 300 }}
                        source={this.state.pathKtp}
                      />
                    }
                  </View>
                </TouchableOpacity>
              </View>
            </ContainerSection>
            <ContainerSection>
              <Input
                label='Alamat'
                value={address}
                onChangeText={v => this.onChangeInput('address', v)}
              />
            </ContainerSection>
            <ContainerSection>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerTextStyle}>Kota</Text>
                <View style={styles.pickerStyle}>
                  <Picker
                    selectedValue={idCity}
                    onValueChange={v => this.onChangeInput('idCity', v)}
                  >
                    {this.renderPickerCity()}
                  </Picker>
                </View>
              </View>
            </ContainerSection>
            <ContainerSection>
              <Input
                label='No. Telepon/Handphone'
                placeholder='contoh: 085219100674'
                keyboardType="numeric"
                value={phone}
                onChangeText={v => this.onChangeInput('phone', v)}
              />
            </ContainerSection>
            <ContainerSection>
              <Input
                label='Email'
                value={email}
                onChangeText={v => this.onChangeInput('email', v)}
              />
            </ContainerSection>
          </Container>

          <Container>
            <ContainerSection>
              <Text style={styles.headerStyle}>
                Data Akun
              </Text>
            </ContainerSection>

            <ContainerSection>
              <Input
                label='Username'
                placeholder='contoh: esta'
                value={username}
                onChangeText={v => this.onChangeInput('username', v)}
              />
            </ContainerSection>
            <ContainerSection>
              <Input
                label='Password'
                placeholder='minimal 6 karakter'
                secureTextEntry
              />
            </ContainerSection>
            <ContainerSection>
              <Input
                label='Konfirmasi Password'
                placeholder='minimal 6 karakter'
                secureTextEntry
                value={password}
                onChangeText={v => this.onChangeInput('password', v)}
              />
            </ContainerSection>

            <View style={{ marginTop: 20, marginBottom: 20 }}>
              <ContainerSection>
                {this.renderButton()}
              </ContainerSection>
            </View>
          </Container>

        </ScrollView>
      </View>
    )
  }
}

const styles = {
  headerStyle: {
    color: COLOR.secondary_a,
    fontSize: 18
  },
  pickerContainer: {
    flex: 1,
    marginBottom: 5
  },
  pickerStyle: {
    borderColor: '#a9a9a9',
    borderRadius: 5,
    paddingLeft: 7,
    borderWidth: 1,
  },
  pickerTextStyle: {
    color: '#5e5e5e',
    fontSize: 14,
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  containerItemAutoSelect: {
    padding: 10,
  },
  avatar: {
    borderRadius: 75,
    width: 100,
    height: 100
  }
}

export default RegistrationFormPage;
