import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { theme } from '../../theme';
import DefaultActionButton from '../components/ActionButton';
import NotificationSetting from '../components/SettingsPage/NotificationSetting';
import CategoriesSetting from '../components/SettingsPage/CategoriesSetting';
import ThemesSetting from '../components/SettingsPage/ThemesSetting';
import PrivacySetting from '../components/SettingsPage/PrivacySetting';
import HelpPage from '../components/SettingsPage/HelpPage';

const settingOptions = (state, setState) => {
  return [
    {
      name: 'Notification',
      activateBy: <FontAwesome name="chevron-right" size={24} color={theme.colors.primary} />,
      activate: () => setState({ isNotificationModalOpen: true }),
      overlayContent: <NotificationSetting state={state} setState={setState} />,
    },
    {
      name: 'Currency',
      activateBy: null,
      activate: null,
    },
    {
      name: 'Categories',
      activateBy: <FontAwesome name="chevron-right" size={24} color={theme.colors.primary} />,
      activate: () => setState({ isCategoriesModalOpen: true }),
      overlayContent: <CategoriesSetting state={state} setState={setState} />,
    },
    {
      name: 'Themes',
      activateBy: <FontAwesome name="chevron-right" size={24} color={theme.colors.primary} />,
      activate: () => setState({ isThemesModalOpen: true }),
      overlayContent: <ThemesSetting state={state} setState={setState} />,
    },
    {
      name: 'Privacy & Security',
      activateBy: <FontAwesome name="chevron-right" size={24} color={theme.colors.primary} />,
      activate: () => setState({ isPrivacyModalOpen: true }),
      overlayContent: <PrivacySetting state={state} setState={setState} />,
    },
    {
      name: 'Help',
      activateBy: <FontAwesome name="chevron-right" size={24} color={theme.colors.primary} />,
      activate: () => setState({ isHelpModalOpen: true }),
      overlayContent: <HelpPage state={state} setState={setState} />,
    },
    {
      name: 'Sign Out',
      activateBy: null,
      activate: null,
      overlayContent: null,
    },
  ];
};

const SettingsPage = () => {
  const [state, setState] = useState({
    isModalOpen: false,
    isCategoriesModalOpen: false,
    isThemesModalOpen: false,
    isPrivacyModalOpen: false,
    isHelpModalOpen: false,
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <View>
            <Text style={styles.titleText}>Settings</Text>
          </View>
          {settingOptions(state, setState).map((item) => {
            return (
              <>
                <TouchableOpacity onPress={item.activate} key={item.name}>
                  <View style={styles.settingOptions}>
                    <Text style={styles.optionText}>{item.name}</Text>
                    {item.activateBy}
                  </View>
                </TouchableOpacity>
                <View key={item.overlayContent}>{item.overlayContent}</View>
              </>
            );
          })}
          <Text style={{ textAlign: 'center', color: theme.colors.primary }}>
            Frugal Version 1.0
          </Text>
        </ScrollView>
      </SafeAreaView>
      <DefaultActionButton />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    overflow: 'scroll',
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
    top: 26,
  },
  content: {
    display: 'flex',
  },
  titleText: {
    fontSize: 36,
    textAlign: 'center',
    marginVertical: 20,
    color: theme.colors.primary,
  },
  settingOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 20,
    paddingVertical: 24,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: theme.colors.primary,
  },
  optionText: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default SettingsPage;
