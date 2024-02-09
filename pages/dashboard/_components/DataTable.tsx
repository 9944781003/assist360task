import { UserProps } from "@/app/lib/features/app/appSlice";
import { debounce } from "@/app/lib/functions";
import { store, useAppSelector } from "@/app/lib/store";
import useDebouncedEffect from "@/hooks/useDebounceEffect";
import axios from "axios";
import React, { useEffect } from "react";
import { Table, Dropdown, Button, Image, Form, Col } from "react-bootstrap";
import { BiFilterAlt } from "react-icons/bi";
export default function DataTable() {
  const users = useAppSelector((state) => state.app.users);
  const departments = [
    "Human Resources",
    "IT",
    "Finance",
    "Sales",
    "IT Support",
    "Software Development",
    "Quality Assurance",
    "Network Administration",
    "Cybersecurity",
    "Data Analysis",
    "Project Management",
    "Research and Development",
  ];
  const roles = ["Admin", "User", "Manager", "Developer", "Tester"];

  async function fetchUsers(args?:{search?:string}) {
    const users = (await axios.post<UserProps[]>("/api/users",{
      where:{
        "OR": [
          {
            name: {
              contains: args?.search,
            },
          },
          {
            email: {
              contains: args?.search,
            },
          },
        ],
      }
    })).data;
    if (users.length) {
      store.dispatch({ type: "app/setUsers", payload: users });
    }
  }
  const [search, setSearch] = React.useState("");
  useDebouncedEffect(() => {
    fetchUsers({search})

    
  }, [search], 1000);

  // useEffect(() => {fetchUsers()}, [])

  return (
    <React.Fragment>
      <Col xs={4}>
        <Form className="mt-5">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>user name/email</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="search"
                placeholder="search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <BiFilterAlt className="ms-3 me-1" /> Filter
            </div>
          </Form.Group>
        </Form>
      </Col>
      <div>Showing {users.length} results</div>
      <Table className="mt-4">
        <thead>
          <tr>
            <th className="fw-regular">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </div>
            </th>
            <th className="fw-regular">Name</th>
            <th className="fw-regular">Email</th>
            <th className="fw-regular">User Role</th>
            <th className="fw-regular">Department</th>
            <th className="fw-regular">Phone</th>
            <th className="fw-regular">Status</th>
            <th className="fw-regular">Teams</th>
            <th className="fw-regular">Join..</th>
            <th className="fw-regular">invited By</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index.toString()}>
              <td>
                {" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                </div>
              </td>
              <td>
                <div>
                  <Image
                    style={{
                      // borderRadius: "40%",
                      padding: "2px",
                      border: `2px solid ${
                        item.isOnline ? "#40bf5e" : "#cdcdcd"
                      }`, // Add the desired border color and width here
                    }}
                    src={`https://i.pravatar.cc/150?img=${index}`}
                    alt="profile"
                    width={32}
                    height={32}
                    className="rounded-circle "
                  />

                  <span className="ms-2">{item.name}</span>
                </div>
              </td>
              <td>{}</td>

              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                    {item.role.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {roles.map((role, index) => (
                      <Dropdown.Item
                        href={`#/action-${index + 1}`}
                        key={index.toString()}
                      >
                        {role}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle style={{
                    minWidth: "150px"
                  }} variant="outline-dark" id="dropdown-basic"
              
                  >
                    {  (item.department.name.length > 10) ? item.department.name.substring(0, 10) +`...` : item.department.name.substring(0, 10)}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {departments.map((department, index) => (
                      <Dropdown.Item
                        href={`#/action-${index + 1}`}
                        key={index.toString()}
                      >
                        {department}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
               {item.phone as string}
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                    {item.status?"Active":"InActive"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Active</Dropdown.Item>
                    <Dropdown.Item href="#/action-1">InActive</Dropdown.Item>
                    
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <Image
                  src={"https://i.pravatar.cc/150?img=3"}
                  alt="profile"
                  width={32}
                  height={32}
                  className="rounded-circle "
                />
                <Image
                  src={"https://i.pravatar.cc/150?img=3"}
                  alt="profile"
                  width={32}
                  height={32}
                  className="rounded-circle"
                />
              </td>
              <td>{String(item?.joinedAt)}</td>
              <td>{"--"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
}
