import { Box, Tabs, Tab } from '@mui/material';
import { menuList } from 'js/utils';
import { lazy, Suspense, useCallback, useState } from 'react';

const ListView = lazy(() => import("./listView"));

const TodoListing = () => {
    const [selectedTab, setSelectTab] = useState(() => menuList[0]);

    const renderListView = useCallback(() =>
        <Suspense fallback={null} key={selectedTab.id}>
            <ListView
                type={selectedTab.type}
            />
        </Suspense>
    , [selectedTab]);

    const handleChange = useCallback((event, _selected) => {
        setSelectTab(() => _selected);
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
                        menuList.map((tab) =>
                            <Tab
                                value={tab}
                                key={tab.id}
                                label={tab.name}
                                icon={tab.iconClass}
                            />
                        )
                    }
                </Tabs>
            </Box>
            {selectedTab && renderListView()}

        </>
    );
};

export default TodoListing;