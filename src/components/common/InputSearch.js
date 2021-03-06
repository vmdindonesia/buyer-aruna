import React, { Component } from 'react'
import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import { COLOR } from './../../shared/lb.config';

class InputSearch extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isFocus: false
		}
	}


	onBlur = () => {
		this.setState({
			isFocus: false,
		})
	}

	imageIcon = (icon) => {
		switch (icon) {
			case 'ic_user':
				return require('./../../assets/images/ic_user.png')
			case 'ic_search':
				return require('./../../assets/images/ic_search.png')
			case 'ic_cancel':
				return require('./../../assets/images/ic_cancel.png')
			default:
				return require('./../../assets/images/ic_password.png')
		}
	}

	isCancel = (txt) => {
		console.log(txt, 'Cancel');
		console.log(this.props, 'Props');
		this.props.isErrase();
	}

	render() {
		const { label, value, onChangeText, isErrase, placeholder, onFocus, autoFocus, secureTextEntry, keyboardType, multiline, lines, editable, icon, textAlignVertical } = this.props
		const { inputStyle, labelStyle, containerStyle } = styles

		return (
			<View style={containerStyle}>
				{
					label ?
						<Text style={labelStyle}>{label}</Text>
						:
						<View />
				}

				<View style={{ ...styles.formWrapper, ...((editable === false) ? styles.lockedForm : {}), ...((this.state.isFocus === true) ? styles.onFocus : {}) }}>

					<TextInput
						secureTextEntry={secureTextEntry}
						placeholder={placeholder}
						autoCorrect={false}
						value={value}
						onChangeText={onChangeText}
						style={inputStyle}
						keyboardType={keyboardType}
						multiline={multiline}
						editable={editable}
						onBlur={() => this.onBlur()}
						onFocus={onFocus}
						autoFocus={autoFocus}
						underlineColorAndroid={'transparent'}
						numberOfLines={lines || 1}
						textAlignVertical={textAlignVertical}
						isErrase={isErrase}
					/>

					{
						icon ?
							<TouchableOpacity onPress={() => this.isCancel(value)}>
								<Image source={this.imageIcon(icon)} style={{ width: 20, height: 20, marginRight: 10 }} />
							</TouchableOpacity>
							: <View />
					}
				</View>
			</View>
		)
	}
}

const styles = {
	formWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		// borderWidth: 1,
		borderColor: '#a9a9a9',
		borderRadius: 5,
		paddingLeft: 7,
		backgroundColor: '#fff'
	},
	lockedForm: {
		opacity: 0.6
	},
	inputStyle: {
		fontSize: 14,
		flex: 1,
		padding: 8,
		fontFamily: 'Muli-Regular'
	},
	labelStyle: {
		color: '#5e5e5e',
		fontSize: 14,
		flex: 1,
		fontFamily: 'Muli-Regular',
		marginBottom: 10,
		marginTop: 10,
	},
	onFocus: {
		borderColor: COLOR.secondary_a
	},
	containerStyle: {
		flex: 1
	}
}

export { InputSearch }
