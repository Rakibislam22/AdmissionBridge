export default function CompareModal({ list, onClose }) {
    return (
        <dialog id="compare_modal" className="modal modal-open">
            <div className="modal-box max-w-4xl">
                {/* Header */}
                <h3 className="font-bold text-xl mb-4 text-center">
                    University Comparison
                </h3>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>University</th>
                                <th>Min GPA</th>
                                <th>Min IELTS</th>
                                <th>Tuition Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((u) => (
                                <tr key={u.id}>
                                    <td className="font-semibold">{u.name}</td>
                                    <td>{u.min_gpa}</td>
                                    <td>{u.min_ielts}</td>
                                    <td>${u.tuition_fee}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Actions */}
                <div className="modal-action">
                    <button onClick={onClose} className="btn btn-outline">
                        Close
                    </button>
                </div>
            </div>

            {/* Click outside to close */}
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
}
