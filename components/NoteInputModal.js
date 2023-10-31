import React, { useEffect, useState, } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Button,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import Voice from '@react-native-community/voice';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle('');
      setDesc('');
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setDesc('');
    }
    onClose();
  };

  const [result, setResult] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
      setIsRecording(true);
      setResult('');
    } catch (error) {
      console.error('Error starting', error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      console.error('Error Stopping', error);
    }
  };

  Voice.onSpeechResults = (event) => {
    console.log("12", event)
    const { value } = event;
    if (value) {
      setResult(value[0]);
      stopRecording()
    }
  }; 

  
  // const [pitch, setPitch] = useState('');
  // const [error, setError] = useState('');
  // const [end, setEnd] = useState('');
  // const [started, setStarted] = useState('');
  // const [results, setResults] = useState([]);
  // const [partialResults, setPartialResults] = useState([]);

  // const onSpeechStart = (e) => {
  //   setStarted('True')
  // };
  // const onSpeechEnd = () => {
  //   setStarted(null);
  //   setEnd('True');
  // };
  // const onSpeechError = (e) => {
  //   setError(JSON.stringify(e.error));
  // };
  // const onSpeechResults = (e) => {
  //   setResults(e.value)
  // };
  // const onSpeechPartialResults = (e) => {
  //   setPartialResults(e.value)
  // };
  // const onSpeechVolumeChanged = (e) => {
  //   setPitch(e.value)
  // };

  // Voice.onSpeechStart = onSpeechStart;
  // Voice.onSpeechEnd = onSpeechEnd;
  // Voice.onSpeechError = onSpeechError;
  // Voice.onSpeechResults = onSpeechResults;
  // Voice.onSpeechPartialResults = onSpeechPartialResults;
  // Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

  // const startSpeechRecognizing = async () => {
  //   setPitch('')
  //   setError('')
  //   setStarted('')
  //   setResults([])
  //   setPartialResults([])
  //   setEnd('')
  //   try {
  //     await Voice.start('en-US',
  //       { EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 10000 });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  // const stopSpeechRecognizing = async () => {
  //   try {
  //     await Voice.stop();
  //     setStarted(null);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };


  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType='fade'>

        <View style={{ marginTop: 30 }}>
          <Button
            title={isRecording ? 'Stop Recording' : 'Start Recording'}
            onPress={isRecording ? stopRecording : startRecording} />

          <Text style={{ color: colors.DARK, fontSize: 40 }}>
            result: {result}
          </Text>
        </View>


        {/* {!started ?
          <TouchableHighlight
            onPress={startSpeechRecognizing}
            style={{  }}>
           <Text>Start</Text>
          </TouchableHighlight>
          :
          <TouchableHighlight
            onPress={stopSpeechRecognizing}
            style={{  }}>
            <Text>Stop</Text>
          </TouchableHighlight>}

          <ScrollView style = {styles.messageBox}>
       {partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`} style={ styles.resultBox }>
               {result}
            </Text>
          ); })}
</ScrollView>
 */}

        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={text => handleOnChangeText(text, 'title')}
            placeholder='Title'
            style={[styles.input, styles.title]}
          >
          </TextInput>

          <TextInput
            value={desc}
            multiline
            placeholder='Note'
            style={[styles.input, styles.desc]}
            onChangeText={text => handleOnChangeText(text, 'desc')}
          />
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={25}
              antIconName='check'
              onPress={handleSubmit}
            />
            {title.trim() || desc.trim() ? (
              <RoundIconBtn
                size={25}
                style={{ marginLeft: 15 }}
                antIconName='close'
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};



const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 25,
  },
});

export default NoteInputModal;
