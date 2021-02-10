import React, { forwardRef } from 'react';
import { FlatList, StyleSheet} from 'react-native';
import { theme } from '../constants';

const List = props => {

    const {
    style,
    
    // color 
    white,


    ...rest
    } = props;

    const listStyle = [
        style,
        
        // color
        white && styles.white,
    ]

    return(
        <FlatList 
        ref={props.innerRef}
        style={listStyle} {...rest} />
    );
}
export default forwardRef((props, ref) => <List innerRef={ref} {...props} />);


const styles = StyleSheet.create({
    white: { backgroundColor: theme.colors.white}
});