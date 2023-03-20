import { Box, Tabs, Tab } from '@mui/material';
import { menuList } from 'js/utils';
import { lazy, Suspense, useCallback, useState } from 'react';

const ListView = lazy(() => import("./listView"));

const TodoListing = () => {
    const [selectedTab, setSelectTab] = useState(() => menuList[0].id);
    const handleChange = useCallback((event, value) => {
        setSelectTab(() => value);
    }, []);
    return (
        <>
            <Box className="menuBarBox">
                <Tabs
                    value={selectedTab}
                    onChange={handleChange}
                    aria-label="todo menu bar"
                    textColor="inherit"
                    indicatorColor="secondary"
                    variant="fullWidth"
                    className='tabButton'
                >
                    {
                        menuList.map(({name, id, IconClass}) =>
                            <Tab
                                key={id}
                                label={name}
                                icon={<IconClass />}
                            />
                        )
                    }
                </Tabs>
            </Box>
            {menuList.map(({type, id}) => (
                selectedTab === id &&
                    <Suspense fallback={null} key={id}>
                        <ListView
                            type={type}
                        />
                    </Suspense>
            ))}

        </>
    );
};

export default TodoListing;