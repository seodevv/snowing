import styled from 'styled-components';

interface Flex {
  margin?: number;
  padding?: number;
  flexDirection?: string;
  wrap?: string;
}

export const FlexBox = styled.div<Flex>`
  margin: ${(props) => (props.margin ? props.margin + 'px' : 0)};
  padding: ${(props) => (props.padding ? props.padding + 'px' : 0)};
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : 'row'};
  flex-wrap: ${(props) => (props.wrap ? props.wrap : 'nowrap')};
`;
