// ToggleSwitch.tsx
import React from 'react';
import { View, Switch } from 'react-native';

interface ToggleSwitchProps {
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isEnabled, onToggle }) => {
  return (
    <View>
      <Switch
        trackColor={{ false: "#767577", true: "#5BA092" }}
        thumbColor={isEnabled ? "#5BA092" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onToggle}
        value={isEnabled}
      />
    </View>
  );
};

export default ToggleSwitch;
