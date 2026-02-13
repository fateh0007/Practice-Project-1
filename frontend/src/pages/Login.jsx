import {useState} from "react";
import {useNavigate, Link} from "react-router-dom"
import {useAuth} from "../hooks/useAuth"

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [identifier,setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login({identifier, password});
            navigate("/todos");
        } catch (error) {
            setError(error?.response?.data?.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {error && <p className="mb-4 text-sm text-red-600 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email or Username
                        </label>
                        <input type="text" value={identifier} onChange={(e)=> setIdentifier(e.target.value)} required className="mt-1 w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <lablel className="block text-sm font-medium text-gray-700">
                            Password
                        </lablel>
                        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} required className="mt-1 w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;