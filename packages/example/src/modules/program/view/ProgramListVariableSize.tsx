import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useMemo } from 'react';
import { SpatialNavigationVirtualizedList } from 'react-tv-space-navigation';
import { RootStackParamList } from '../../../../App';
import { ProgramNode } from './ProgramNode';
import { scaledPixels } from '../../../design-system/helpers/scaledPixels';
import { VariableSizeProgramInfo } from '../domain/variableSizeProgramInfo';
import { ProgramNodeLandscape } from './ProgramNodeLandscape';
import { getVariableSizePrograms } from '../infra/variableSizeProgramInfo';

const NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN = 7;
const WINDOW_SIZE = NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN + 8;
const ROW_PADDING = scaledPixels(70);

export const ProgramList = ({
  orientation,
  containerStyle,
}: {
  orientation?: 'vertical' | 'horizontal';
  containerStyle?: object;
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = useCallback(
    ({ item }: { item: VariableSizeProgramInfo }) =>
      item.type === 'portrait' ? (
        <ProgramNode
          programInfo={item}
          onSelect={() => navigation.push('ProgramDetail', { programInfo: item })}
        />
      ) : (
        <ProgramNodeLandscape
          programInfo={item}
          onSelect={() => navigation.push('ProgramDetail', { programInfo: item })}
        />
      ),
    [navigation],
  );
  const theme = useTheme();

  const programInfos = useMemo(() => getVariableSizePrograms(10), []);

  return (
    <Container style={containerStyle}>
      <SpatialNavigationVirtualizedList
        orientation={orientation}
        data={programInfos}
        renderItem={renderItem}
        itemSize={(item) =>
          item.type === 'portrait'
            ? theme.sizes.program.portrait.width + 30
            : theme.sizes.program.landscape.width * 2 + 45
        }
        numberOfRenderedItems={WINDOW_SIZE}
        numberOfItemsVisibleOnScreen={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
        onEndReachedThresholdItemsNumber={NUMBER_OF_ITEMS_VISIBLE_ON_SCREEN}
      />
    </Container>
  );
};

export const ProgramsRowVariableSize = ({ containerStyle }: { containerStyle?: object }) => {
  const theme = useTheme();
  return (
    <ProgramList
      containerStyle={{
        ...containerStyle,
        height: theme.sizes.program.portrait.height + ROW_PADDING,
      }}
    />
  );
};

const Container = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.background.mainHover,
  padding: theme.spacings.$8,
  borderRadius: scaledPixels(20),
  overflow: 'hidden',
}));
