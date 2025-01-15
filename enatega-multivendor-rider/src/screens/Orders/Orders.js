import { View, FlatList, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import ScreenBackground from '../../components/ScreenBackground/ScreenBackground'
import styles from './style'
import Tabs from '../../components/Tabs/Tabs'
import Order from '../../components/Order/Order'
import { TabsContext } from '../../context/tabs'
import { useFocusEffect } from '@react-navigation/native'
import ConfigurationContext from '../../context/configuration'
import LottieView from 'lottie-react-native'
import TextDefault from '../../components/Text/TextDefault/TextDefault'
import colors from '../../utilities/colors'
import { useTranslation } from 'react-i18next'

const { height, width } = Dimensions.get('window')

const Orders = ({ navigation }) => {
  const { t } = useTranslation()
  const { setActive } = useContext(TabsContext)
  const configuration = useContext(ConfigurationContext)

  // Static test orders for Ecuador - memoize this to prevent recreating on each render
  const staticOrders = React.useMemo(
    () => [
      {
        _id: '1',
        orderId: 'GYE-2024-001',
        orderStatus: 'ASSIGNED',
        orderAmount: 12.5,
        paymentMethod: 'Efectivo',
        createdAt: '2024-01-15T14:30:00',
        restaurant: {
          name: 'Encebollado Don Pedro',
          address: 'Av. 9 de Octubre, Guayaquil'
        },
        deliveryAddress: {
          deliveryAddress: 'Cdla. Kennedy Norte, Mz. 405',
          details: 'Edificio Blue Towers, Piso 5, Oficina 502'
        },
        items: [
          {
            _id: 'item1',
            title: 'Encebollado',
            food: 'Sopa de pescado',
            description: 'Deliciosa sopa de pescado con cebolla y yuca',
            quantity: 1,
            variation: {
              _id: 'variation1',
              title: 'Tamaño Regular',
              price: 12.5
            }
          }
        ]
      },
      {
        _id: '2',
        orderId: 'UIO-2024-002',
        orderStatus: 'PICKED',
        orderAmount: 25.75,
        paymentMethod: 'Transferencia',
        createdAt: '2024-01-15T15:15:00',
        restaurant: {
          name: 'Locro de la Sierra',
          address: 'Av. República, Quito'
        },
        deliveryAddress: {
          deliveryAddress: 'La Carolina, Calle Amazonas',
          details: 'Frente al parque, Casa azul #123'
        },
        items: [
          {
            _id: 'item2',
            title: 'Locro',
            food: 'Sopa de papa',
            description: 'Sopa tradicional de papa con aguacate',
            quantity: 1,
            variation: {
              _id: 'variation2',
              title: 'Tamaño Grande',
              price: 25.75
            }
          }
        ]
      },
      {
        _id: '3',
        orderId: 'CUE-2024-003',
        orderStatus: 'ACCEPTED',
        orderAmount: 18.9,
        paymentMethod: 'Efectivo',
        createdAt: '2024-01-15T16:00:00',
        restaurant: {
          name: 'Cevichería El Manaba',
          address: 'Malecón 2000, Local 15'
        },
        deliveryAddress: {
          deliveryAddress: 'Urdesa Central',
          details: 'Calle Primera 234, Casa Verde'
        },
        items: [
          {
            _id: 'item3',
            title: 'Ceviche de Pescado',
            food: 'Ceviche fresco',
            description: 'Ceviche de pescado con limón y cebolla',
            quantity: 1,
            variation: {
              _id: 'variation3',
              title: 'Porción Individual',
              price: 18.9
            }
          }
        ]
      }
    ],
    []
  ) // Empty dependency array since this data is static

  const [orders] = useState(staticOrders)

  useFocusEffect(
    React.useCallback(() => {
      setActive('MyOrders')
    }, [setActive])
  )

  const renderOrder = React.useCallback(
    ({ item }) => (
      <Order
        order={item}
        alwaysShow={true}
        key={item._id}
        id={item._id}
        orderAmount={`$${item.orderAmount.toFixed(2)}`}
      />
    ),
    []
  )

  return (
    <ScreenBackground>
      <View style={styles.innerContainer}>
        <View>
          <Tabs navigation={navigation} />
        </View>
        {orders.length > 0 ? (
          <FlatList
            style={styles.ordersContainer}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
            keyExtractor={item => item._id}
            data={orders}
            showsVerticalScrollIndicator={false}
            renderItem={renderOrder}
          />
        ) : (
          <View
            style={{
              minHeight:
                height > 670 ? height - height * 0.5 : height - height * 0.6,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <LottieView
              style={{
                width: width - 100,
                height: 250
              }}
              source={require('../../assets/loader.json')}
              autoPlay
              loop
            />
            <TextDefault bolder center H3 textColor={colors.fontSecondColor}>
              {t('notAnyOrdersYet')}
            </TextDefault>
          </View>
        )}
      </View>
    </ScreenBackground>
  )
}

export default Orders
