import { /* useDispatch, */ useSelector } from 'react-redux';
import { RootState } from '../../redux';

export const HostRoom = () => {
    const names = useSelector((state: RootState) => state.socketsData.playerNames);

    return (
        <div>
            {names.length ? (
                <div style={{ marginTop: '200px' }}>
                    {names.map((item: string, ind: number) => (
                        <div key={ind}>{item}</div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};
