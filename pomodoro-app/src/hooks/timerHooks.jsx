

export default function usePhase(phase) {
    console.log('phase string: ' + phase);
    if(phase === 0){
        return 'Work';
    }else if(phase === 1){
        return 'Short Break';
    }else { 
        return 'Long Break';
    }
}

