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
  posit?: 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;
  dis?: 'block' | 'inline-block' | 'inline' | 'table' | 'flex' | 'grid';
  flexDir?: 'row' | 'column';
  flexWrap?: 'wrap' | 'nowrap';
  flexJustCon?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'space-arround'
    | 'space-between';
  flexAlignItem?: string;
  flexGrow?: number;
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
  textAlign?: string;
  objFit?: string;
  objPosit?: string;
  overflow?: 'hidden' | 'scroll';
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
  flex-direction: ${({ flexDir }) => flexDir};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  justify-content: ${({ flexJustCon }) => flexJustCon};
  align-items: ${({ flexAlignItem }) => flexAlignItem};
  flex-grow: ${({ flexGrow }) => flexGrow};
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
  font-family: ${({ ftFamily }) => ftFamily};
  font-size: ${({ ftSize }) => ftSize};
  font-weight: ${({ ftWeight }) => ftWeight};
  font-style: ${({ ftStyle }) => ftStyle};
  text-align: ${({ textAlign }) => textAlign};
  object-fit: ${({ objFit }) => objFit};
  object-position: ${({ objPosit }) => objPosit};
  overflow: ${({ overflow }) => overflow};
`;

export const Container = styled.section`
  ${GlobalStyle}
`;

export const Box = styled.div`
  ${GlobalStyle}
`;

export const FlexBox = styled.div`
  ${GlobalStyle}
  display: flex;
`;

export const GridBox = styled.div`
  ${GlobalStyle}
  display: grid;
`;

export const Img = styled.img`
  ${GlobalStyle}
`;
