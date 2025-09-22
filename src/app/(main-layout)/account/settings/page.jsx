"use client";
import { AccountCircleRounded, ReceiptRounded } from "@mui/icons-material";
import { Box, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountBilling from "../../../../components/acount/AccountBilling";
import AccountGeneral from "../../../../components/acount/AccountGeneral";
import Breadcrumb from "../../../../components/acount/BreadCrumbs";
import { PATH_ACCOUNT } from "../../../../config/config/route";

export default function AccountSettings() {
  const { push } = useRouter();
  const { user, accessToken } = useSelector((state) => state.auth);
  const [currentTab, setCurrentTab] = useState("general");

  useEffect(() => {
    if (!accessToken || !user) {
      push("/");
    }
  }, [accessToken, user, push]);

  useEffect(() => {
    document.title = `Account Settings - ${currentTab} || Shothik AI`;
  }, [currentTab]);

  const TABS = [
    {
      value: "general",
      label: "General",
      icon: (
        <AccountCircleRounded
          sx={{ color: "text.secondary" }}
          fontSize='small'
        />
      ),
      component: <AccountGeneral user={user} />,
    },
    {
      value: "billing",
      label: "Billing",
      icon: (
        <ReceiptRounded sx={{ color: "text.secondary" }} fontSize='small' />
      ),
      component: <AccountBilling user={user} />,
    },
  ];

  const handleTab = (event, newValue) => {
    setCurrentTab(newValue);
    window.history.pushState({}, "", PATH_ACCOUNT.settings[newValue]);
  };

  return (
    <Box sx={{ px: 2 }}>
      <Breadcrumb
        heading='Account'
        activeLast={currentTab}
        links={[
          { name: "Account" },
          { name: "Settings" },
          { name: currentTab },
        ]}
      />

      <Tabs scrollButtons={false} value={currentTab} onChange={handleTab}>
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>

      {TABS.map(
        (tab) =>
          tab.value === currentTab && (
            <Box key={tab.value} sx={{ my: 5 }}>
              {tab.component}
            </Box>
          )
      )}
    </Box>
  );
}
