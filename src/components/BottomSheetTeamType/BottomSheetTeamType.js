import { View, Text } from 'react-native'
import React, { useCallback, useRef } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetTeamType = ({ options = [] }) => {

    const bottomSheetRef = useRef(null);

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
      }, []);

  return (
    <View style={{ flex: 1 }}>
        <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={options}
        onChange={handleSheetChanges}
      >
        <View style={{ height: 50 }}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  )
}

export default BottomSheetTeamType