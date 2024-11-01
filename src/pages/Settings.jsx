import SettingsContainer from "../features/settings/SettingsContainer"
import PageHeader from "../ui/PageHeader"

function Settings() {
    return (
        <div className="px-8 overflow-y-scroll h-[88%] pb-5">
        <PageHeader pageName='Settings' pagePath='Acount settings' />
        <SettingsContainer />
       </div>
    )
}

export default Settings
