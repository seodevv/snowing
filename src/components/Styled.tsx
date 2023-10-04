import styled, { css } from 'styled-components';

interface GlobalProps {
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
  posit?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;
  dis?: string;
  wid?: string;
  minWid?: string;
  maxWid?: string;
  hei?: string;
  minHei?: string;
  maxHei?: string;
  bg?: string;
  bgSize?: string;
  bgPosit?: string;
  bd?: string;
  bdTop?: string;
  bdRight?: string;
  bdBottom?: string;
  bdLeft?: string;
  br?: string;
  brTR?: string;
  brBR?: string;
  brBL?: string;
  brTL?: string;
  ftFamily?: string;
  ftSize?: string;
  ftWeight?: string;
  ftStyle?: string;
}

interface FlexProps {
  ma?: string;
  pa?: string;
  flexDir?: string;
  flexWrap?: string;
  flexJustCon?: string;
  flexAlignItem?: string;
  flexGrow?: number;
  color?: string;
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
  width: ${({ wid }) => wid};
  min-width: ${({ minWid }) => minWid};
  max-width: ${({ maxWid }) => maxWid};
  height: ${({ hei }) => hei};
  min-height: ${({ minHei }) => minHei};
  max-height: ${({ maxHei }) => maxHei};
  background: ${({ bg }) => bg};
  background-size: ${({ bgSize }) => bgSize};
  background-position: ${({ bgPosit }) => bgPosit};
  border: ${({ bd }) => bd};
  border-top: ${({ bdTop }) => bdTop};
  border-right: ${({ bdRight }) => bdRight};
  border-bottom: ${({ bdBottom }) => bdBottom};
  border-left: ${({ bdLeft }) => bdLeft};
  border-radius: ${({ br }) => br};
  border-top-right-radius: ${({ brTR }) => brTR};
  border-bottom-right-radius: ${({ brBR }) => brBR};
  border-bottom-left-radius: ${({ brBL }) => brBL};
  border-top-left-radius: ${({ brTL }) => brTL};
`;

export const FlexBox = styled.div<FlexProps>`
  margin: ${(props) => props.ma};
  padding: ${(props) => props.pa};
  display: flex;
  flex-direction: ${(props) => props.flexDir};
  flex-wrap: ${(props) => props.flexWrap};
  justify-content: ${(props) => props.flexJustCon};
  align-items: ${(props) => props.flexAlignItem};
  color: ${(props) => props.color};
`;

export const FlexGrowBox = styled.div<FlexProps>`
  flex-grow: ${(props) => props.flexGrow};
`;
