import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import StyledButton from '../components/StyledButton';
import StyledTextInput from '../components/StyledTextInput';
import StyledSelect from '../components/StyledSelect';
import CustomModal from '../components/CustomModal';
import AmountBox from '../components/AmountBox';
import { theme } from '../../theme';
import axios from 'axios';
import { formatDateBE, formatDateFE } from '../utils/formatters';

const ItemSummary = ({ modalVisible, setModalVisible, item, userCategories, type }) => {
  const [price, setPrice] = useState(item.price || item.amount);
  const [name, setName] = useState(item.name);
  const [date, setDate] = useState(item.date);
  const [category, setCategory] = useState(item.category);
  const [tag, setTag] = useState(item.sub_category);
  const [description, setDescription] = useState(item.description);
  const [location, setLocation] = useState(item.location);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);

  const onUpdate = () => {
    const updateObject = {
      item: price,
      name,
      description,
      date: formatDateBE(date),
      category,
      sub_category: tag,
      location,
    };
    console.log(updateObject);

    setModalVisible(false);
  };

  return (
    <CustomModal isModalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View style={styles.content}>
        <Text style={styles.title}>{type === 'Expenses' ? 'Expense' : 'Income'} Summary</Text>
        <AmountBox
          fields={[
            price || 0.0,
            name,
            description,
            formatDateFE(date),
            category || '',
            tag,
            location,
          ]}
        />
        <StyledTextInput
          label={type === 'Expenses' ? 'Price' : 'Amount'}
          onChange={(newVal) => setPrice(newVal)}
          keyboardType="numeric"
          value={price}
          required
        />
        <StyledTextInput
          label="Name"
          onChange={(newVal) => setName(newVal)}
          keyboardType="default"
          value={name}
          required
        />
        <StyledTextInput
          onChange={(newVal) => setDescription(newVal)}
          keyboardType="default"
          label="Description"
          placeholder="Optional..."
          value={description}
          multiline
        />
        <StyledTextInput
          label="Date"
          onChange={(newVal) => setDate(newVal)}
          keyboardType="default"
          value={formatDateFE(date)}
          required
        />
        <StyledSelect
          label="Category"
          categories={userCategories.map((cat, index) => {
            return {
              label: cat,
              value: cat,
              key: index,
            };
          })}
          category={category}
          setCategory={setCategory}
          categoryDropdownVisible={categoryDropdownVisible}
          setCategoryDropdownVisible={setCategoryDropdownVisible}
          placeholder={item.category}
          required
        />
        {type === 'Expenses' && (
          <StyledTextInput
            onChange={setTag}
            keyboardType="default"
            label="Tag"
            placeholder="Optional..."
          />
        )}
        <StyledTextInput
          onChange={(newVal) => setLocation(newVal)}
          keyboardType="default"
          label="Location"
          placeholder="Optional..."
          value={location}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View style={styles.button}>
            <StyledButton label="Cancel" onTap={() => setModalVisible(false)} />
          </View>
          <View style={styles.button}>
            <StyledButton label="Save" onTap={() => onUpdate()} />
          </View>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  button: {
    marginHorizontal: 20,
  },
});

export default ItemSummary;