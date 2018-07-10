import schedule from 'node-schedule'
import SettingsLogic from '../api/setting/logic'

const Tasks = {
  nationalBank () {
    console.log(`The completion cron-time of the current NBTask`)
    schedule.scheduleJob('0 0 10 * * *', () => {
      SettingsLogic.rubToDb()
    })
  }
}

export default Tasks
