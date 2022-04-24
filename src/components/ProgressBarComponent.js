import React, { useState } from 'react';
import { ProgressBar} from 'react-native-paper';

const ProgressBarComponent = (props) => {

    const [progress, setProgress] = useState(props.progress);

    return(
        <ProgressBar progress={progress} color='#2795D2' />
    );
  
 }

export default ProgressBarComponent;