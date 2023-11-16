import styled, { css } from 'styled-components';

type FlexAlign =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'space-arround'
  | 'space-between'
  | 'unset';

export interface GlobalProps {
  ma?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  pa?: string;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  posit?: 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;
  dis?: 'block' | 'inline-block' | 'inline' | 'table' | 'flex' | 'grid';
  flex?: number;
  flexDir?: 'row' | 'column';
  flexWrap?: 'wrap' | 'nowrap';
  flexJustCon?: FlexAlign;
  flexJustItem?: FlexAlign;
  flexAlignCon?: FlexAlign;
  flexAlignItem?: FlexAlign;
  flexGrow?: number;
  wid?: string;
  minWid?: string;
  maxWid?: string;
  hei?: string;
  minHei?: string;
  maxHei?: string;
  aspectRatio?: string;
  bg?: string;
  bgSize?: string;
  bgPosit?: string;
  backdropFilter?: string;
  bd?: string;
  bdTop?: string;
  bdRight?: string;
  bdBottom?: string;
  bdLeft?: string;
  bdColor?: string;
  br?: string;
  brTR?: string;
  brBR?: string;
  brBL?: string;
  brTL?: string;
  ftFamily?: string;
  ftSize?: string;
  ftWeight?: string;
  ftStyle?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  textDecoration?: 'underline' | 'unset';
  textUnderlineOffset?: string;
  lineHeight?: string;
  letterSpacing?: string;
  wordSpacing?: string;
  boxShadow?: string;
  objFit?: string;
  objPosit?: string;
  overflow?: 'hidden' | 'scroll';
  transform?: string;
  transition?: string;
  float?: 'left' | 'right' | 'inline-start' | 'inline-end' | 'none';
  filter?: string;
  cursor?: 'pointer';
}

const GlobalStyle = css<GlobalProps>`
  margin: ${({ ma }) => ma};
  margin-top: ${({ mt }) => mt};
  margin-right: ${({ mr }) => mr};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  padding: ${({ pa }) => pa};
  padding-top: ${({ pt }) => pt};
  padding-right: ${({ pr }) => pr};
  padding-bottom: ${({ pb }) => pb};
  padding-left: ${({ pl }) => pl};
  position: ${({ posit }) => posit};
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  z-index: ${({ zIndex }) => zIndex};
  display: ${({ dis }) => dis};
  flex: ${({ flex }) => flex};
  flex-direction: ${({ flexDir }) => flexDir};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  justify-content: ${({ flexJustCon }) => flexJustCon};
  justify-items: ${({ flexJustItem }) => flexJustItem};
  align-content: ${({ flexAlignCon }) => flexAlignCon};
  align-items: ${({ flexAlignItem }) => flexAlignItem};
  flex-grow: ${({ flexGrow }) => flexGrow};
  width: ${({ wid }) => wid};
  min-width: ${({ minWid }) => minWid};
  max-width: ${({ maxWid }) => maxWid};
  height: ${({ hei }) => hei};
  min-height: ${({ minHei }) => minHei};
  max-height: ${({ maxHei }) => maxHei};
  aspect-ratio: ${({ aspectRatio }) => aspectRatio};
  background: ${({ bg }) => bg};
  background-size: ${({ bgSize }) => bgSize};
  background-position: ${({ bgPosit }) => bgPosit};
  backdrop-filter: ${({ backdropFilter }) => backdropFilter};
  border: ${({ bd }) => bd};
  border-top: ${({ bdTop }) => bdTop};
  border-right: ${({ bdRight }) => bdRight};
  border-bottom: ${({ bdBottom }) => bdBottom};
  border-left: ${({ bdLeft }) => bdLeft};
  border-color: ${({ bdColor }) => bdColor};
  border-radius: ${({ br }) => br};
  border-top-right-radius: ${({ brTR }) => brTR};
  border-bottom-right-radius: ${({ brBR }) => brBR};
  border-bottom-left-radius: ${({ brBL }) => brBL};
  border-top-left-radius: ${({ brTL }) => brTL};
  font-family: ${({ ftFamily }) => ftFamily};
  font-size: ${({ ftSize }) => ftSize};
  font-weight: ${({ ftWeight }) => ftWeight};
  font-style: ${({ ftStyle }) => ftStyle};
  color: ${({ color }) => color};
  text-align: ${({ textAlign }) => textAlign};
  text-decoration: ${({ textDecoration }) => textDecoration};
  text-underline-offset: ${({ textUnderlineOffset }) => textUnderlineOffset};
  line-height: ${({ lineHeight }) => lineHeight};
  letter-spacing: ${({ letterSpacing }) => letterSpacing};
  word-spacing: ${({ wordSpacing }) => wordSpacing};
  box-shadow: ${({ boxShadow }) => boxShadow};
  object-fit: ${({ objFit }) => objFit};
  object-position: ${({ objPosit }) => objPosit};
  overflow: ${({ overflow }) => overflow};
  transform: ${({ transform }) => transform};
  transition: ${({ transition }) => transition};
  float: ${({ float }) => float};
  filter: ${({ filter }) => filter};
  cursor: ${({ cursor }) => cursor};
`;

export const Container = styled.section`
  ${GlobalStyle}
`;
export const Box = styled.div`
  ${GlobalStyle}
`;
export const IBBox = styled(Box)`
  display: inline-block;
`;
export const FlexGrowBox = styled(Box)`
  flex-grow: 1;
`;
export const FlexBox = styled.div`
  ${GlobalStyle}
  display: flex;
  flex-wrap: ${(props) => (props.flexWrap ? props.flexWrap : 'nowrap')};
  justify-content: ${(props) =>
    props.flexJustCon ? props.flexJustCon : 'center'};
  align-items: ${(props) =>
    props.flexAlignItem ? props.flexAlignItem : 'center'};
`;
export const FlexColumnBox = styled(FlexBox)`
  ${GlobalStyle}
  flex-direction: column;
  flex-wrap: ${(props) => (props.flexWrap ? props.flexWrap : 'nowrap')};
  justify-content: ${(props) =>
    props.flexJustCon ? props.flexJustCon : 'center'};
  align-items: ${(props) =>
    props.flexAlignItem ? props.flexAlignItem : 'center'};
`;
export const GridBox = styled.div`
  ${GlobalStyle}
  display: grid;
`;
export const Img = styled.img`
  ${GlobalStyle}
`;
export const Input = styled.input`
  ${GlobalStyle}
`;
export const Label = styled.label`
  ${GlobalStyle}
`;
export const H1 = styled.h1`
  ${GlobalStyle}
`;
export const H2 = styled.h2`
  ${GlobalStyle}
`;
export const H3 = styled.h3`
  ${GlobalStyle}
`;
export const H4 = styled.h4`
  ${GlobalStyle}
`;
export const H5 = styled.h5`
  ${GlobalStyle}
`;
export const H6 = styled.h6`
  ${GlobalStyle}
`;
export const P = styled.p`
  ${GlobalStyle}
`;
export const Span = styled.span`
  ${GlobalStyle}
`;
export const A = styled.a`
  ${GlobalStyle}
`;
export const Button = styled.button`
  ${GlobalStyle}
  padding: ${(props) => (props.pa ? props.pa : '6px 12px')};
  background: ${(props) => (props.bg ? props.bg : 'transparent')};
  border: ${(props) => (props.bd ? props.bd : 'none')};
  border-radius: ${(props) => (props.br ? props.br : '5px')};
  transition: ${(props) =>
    props.transition ? props.transition : '0.1s opacity ease-in'};
  cursor: pointer;

  &:not(:last-of-type) {
    margin-right: 10px;
  }

  &:hover:enabled {
    opacity: 0.5;
  }

  &:active:enabled {
    opacity: 0.75;
    transition: none;
  }

  &:disabled {
    opacity: 0.3;
  }
`;
