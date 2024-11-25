import { Spin } from "antd"

const Loader = () => {
  return (
    <div className="flex my-10 w-full justify-center items-center">
		<Spin size="large"/>
	</div>
  )
}

export default Loader