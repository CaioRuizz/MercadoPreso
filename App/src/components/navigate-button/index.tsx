import Styles from './styles';
import { TouchableOpacity, Text } from "react-native"


const NavigateButton = ({ navigation, navigateToPage, title }) => (
    <TouchableOpacity style={Styles.botao} onPress={() => navigation.navigate(navigateToPage)}>
        <Text>
            {title}
        </Text>
    </TouchableOpacity>
)

export default NavigateButton