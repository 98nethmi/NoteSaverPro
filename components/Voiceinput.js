// import React from "react";
// import { View, Text } from "react-native";
// import Voice from '@react-native-voice/voice';
// import React from 'react'


// const Voiceinputs = () => {

//     const [result, setResult] = React.useState('');
//     const [error, setError] = React.useState('');
//     const [isRecording, setIsRecording] = React.useState(false);

//     Voice.onSpeechStart = () => setIsRecording(true);
//     Voice.onSpeechEnd = () => setIsRecording(false);
//     Voice.onSpeechError = err => setError(err.error);
//     Voice.onSpeechResults = result => setResult(result.value[0]);

//     const startRecording = async () => {
//         try {
//             await Voice.start('en-US');
//         } catch (err) {
//             setError(err);
//         }
//     };

//     const stopRecording = async () => {
//         try {
//             await Voice.stop();
//         } catch (error) {
//             setError(error);
//         }
//     };

//     return (
//         <View>
//           <Text>{result}</Text>
//           <Text>{error}</Text>
         

//           <TouchableOpacity
//             style={{ marginTop: 30}}
//             onPress={isRecording ? stopRecording : startRecording}>
//             <Text style={{ color:colors.DARK, fontSize: 40 }}>
//               {isRecording ? 'Stop' : 'Strat'}
//             </Text>
//           </TouchableOpacity>
//           </View>
//       )

// }

// export default Voiceinputs