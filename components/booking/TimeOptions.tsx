import {Switch} from "@headlessui/react";
import TimezoneSelect from "react-timezone-select";
import {useEffect, useState} from "react";
import {timeZone, is24h} from '../../lib/clock';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const TimeOptions = (props) => {

  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const [is24hClock, setIs24hClock] = useState(false);

  useEffect( () => {
    setIs24hClock(is24h());
    setSelectedTimeZone(timeZone());
  }, []);

  useEffect( () => {
    props.onSelectTimeZone(timeZone(selectedTimeZone));
  }, [selectedTimeZone]);

  useEffect( () => {
    props.onToggle24hClock(is24h(is24hClock));
  }, [is24hClock]);

  return selectedTimeZone !== "" && (
    <div className="w-full rounded shadow border bg-white px-4 py-2">
      <div className="flex mb-4">
        <div className="w-1/2 font-medium">Time Options</div>
        <div className="w-1/2">
          <Switch.Group
            as="div"
            className="flex items-center justify-end"
          >
            <Switch.Label as="span" className="mr-3">
              <span className="text-sm text-gray-500">am/pm</span>
            </Switch.Label>
            <Switch
              checked={is24hClock}
              onChange={setIs24hClock}
              className={classNames(
                is24hClock ? "bg-blue-600" : "bg-gray-200",
                "relative inline-flex flex-shrink-0 h-5 w-8 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              )}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={classNames(
                  is24hClock ? "translate-x-3" : "translate-x-0",
                  "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-3">
              <span className="text-sm text-gray-500">24h</span>
            </Switch.Label>
          </Switch.Group>
        </div>
      </div>
      <TimezoneSelect
        id="timeZone"
        value={selectedTimeZone}
        onChange={(tz) => setSelectedTimeZone(tz.value)}
        className="mb-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  );
}

export default TimeOptions;