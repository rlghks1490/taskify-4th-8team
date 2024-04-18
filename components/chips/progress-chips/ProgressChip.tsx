import * as S from './ProgressChip.style';

interface ProgressChipType {
  children: string;
}

const ProgressChip = ({ children }: ProgressChipType) => {
  return (
    <div>
      <S.ProgressChipStyle className='font-12-regular'>
        <div className='point' />
        <span className='text'>{children}</span>
      </S.ProgressChipStyle>
    </div>
  );
};

export default ProgressChip;