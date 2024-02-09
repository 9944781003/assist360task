// import React from 'react'
// import {View,styled,Text, TextInput,Image} from 'dripsy'
// import { TextInputProps } from 'react-native'
// import { Gradient } from 'dripsy/gradient'




// // /* Group 1 */

// // position: absolute;
// // width: 364px;
// // height: 52.11px;
// // left: 159px;
// // top: 227.17px;



// // /* Rectangle 6 */

// // position: absolute;
// // width: 364px;
// // height: 52.11px;
// // left: 159px;
// // top: 227.17px;

// // background: rgba(240, 237, 255, 0.8);
// // border-radius: 16px;


// // /* Username */

// // position: absolute;
// // width: 62px;
// // height: 18.04px;
// // left: 207px;
// // top: 244.2px;

// // font-family: 'Poppins';
// // font-style: normal;
// // font-weight: 400;
// // font-size: 12px;
// // line-height: 18px;

// // color: #1C1C1C;



// // /* Frame */

// // position: absolute;
// // width: 24px;
// // height: 24.05px;
// // left: 177px;
// // top: 241.2px;



// // /* Vector */

// // position: absolute;
// // left: 16.67%;
// // right: 16.67%;
// // top: 4.17%;
// // bottom: 8.33%;

// // background: #1C1C1C;


// const StyledInputText=styled(View)({
//   borderRadius: 46,
//   borderWidth: 1,
//   borderColor: 'rgba(255, 255, 255, 0.52)',
//   paddingLeft: 20,
//   marginTop: 20,
//   width: 300,
//   height: 50,
//   justifyContent: 'center',
  
  

// })

// type AppInputTextProps =TextInputProps & {
//   leftIcon?:React.ReactNode
// }



// export default function AppInputText(props:AppInputTextProps) {
//   return (
   

//     <StyledInputText
//     sx={({colors})=>({
//       backgroundColor: colors?.light as string,
//     })}
// >
//   <View sx={{flexDirection:"row"}}>
 
//   {props.leftIcon}
//   <TextInput
//   secureTextEntry={props.secureTextEntry}
//   sx={{width: '100%',marginInline:10,border:0,outlineStyle:'none'}}
//   placeholder={props.placeholder}
//   value={props.value}
//   onChangeText={props.onChangeText}
//   placeholderTextColor="#1C1C1C"
//   />
//   </View>




  
//     </StyledInputText>
//   )

  
  
  
// }
import React from 'react'

export default function AppTextInput() {
  return (
    <div>AppTextInput</div>
  )
}

