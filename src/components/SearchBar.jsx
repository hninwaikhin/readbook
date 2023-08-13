import { Form, FormControl, InputGroup, Container, Row, Col } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar(props) {
    return (
        <Container className={"absolute " + props.className}>
            <Row>
                <Col sm={4}>
                    <Form className="d-flex">
                        <InputGroup>
                            <InputGroup.Text className="bg-white">
                                <AiOutlineSearch style={{ color: '#6b7280', fontSize: '20px' }} />
                            </InputGroup.Text>
                            <FormControl type="search" className="me-2" placeholder="Search" onChange={props.onSearch} />
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

SearchBar.defaultProps = {
    className: "mt-3"
}